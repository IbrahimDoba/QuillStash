import { commentSchema, CommentValues } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function CommentForm({ userId, postId }: { userId: string; postId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  
  const createComment = async (commentData: CommentValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...commentData,
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to create comment');
    }
    return res.json();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', 'ffdfd'] });
      toast('Comment created successfully');
    },
    onError: (error) => {
      toast(`Failed to create comment: ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId,
      userId,
    },
  });

  const onSubmit = async (data: CommentValues) => {
    mutate(data);
  };

  return (
    <>
      <Button onClick={onOpen} radius='sm'>
        Post comment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Post comment
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Card shadow='none' className='flex flex-col gap-6'>
                    <div>
                      <label htmlFor='comment' className='sr-only'>
                        Comment
                      </label>
                      <Textarea
                        {...register('body')}
                        id='comment'
                        placeholder='say something...'
                      />
                      {errors.body && (
                        <p className='px-1 text-xs text-red-600'>
                          {errors.body.message}
                        </p>
                      )}
                      <input hidden type='hidden' {...register('postId')} />
                      <input hidden type='hidden' {...register('userId')} />
                      {/* if any isues submiting comments remember these inputs */}
                    </div>
                  </Card>
                </ModalBody>
                <ModalFooter className='justify-start'>
                  <div className='flex items-center justify-between w-full'>
                    <Avatar
                      src={'/user-1.png'}
                      alt='profile picture'
                      size='sm'
                      name={'User'}
                    />
                    <div className='flex gap-4'>
                      <Button color='danger' variant='light' onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color='primary'
                        type='submit'
                        className='flex w-fit items-center gap-2'
                      >
                        {isSubmitting ? 'Posting...' : 'Post'}
                      </Button>
                    </div>
                  </div>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CommentForm;
