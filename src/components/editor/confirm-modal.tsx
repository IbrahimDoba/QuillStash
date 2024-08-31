import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Progress,
  Textarea,
} from '@nextui-org/react';
import { SingleImageDropzone } from '@/components/ui/image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import TagInput from '@/components/TagInput';
import {
  useController,
  Control,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form';
import { PostValues } from '@/lib/zod';
import Container from '@/components/Container';
import { toast } from 'sonner';

interface ConfirmModalProps {
  control: Control<PostValues>;
  register: UseFormRegister<PostValues>;
  setValue: UseFormSetValue<PostValues>;
  errors: FieldErrors<PostValues>;
  formRef: React.RefObject<HTMLFormElement>;
  isSubmitting: boolean;
}

export default function ConfirmModal({
  control,
  register,
  setValue,
  errors,
  formRef,
  isSubmitting,
}: ConfirmModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);

  const startUpload = async () => {
    if (!file) return;

    await edgestore.myPublicImages
      .upload({
        file,
        input: { type: 'bodyImage' },
        onProgressChange: setProgress,
      })
      .then((res) => {
        setImageUrl(res.url);
        setValue('image', res.url);
        setProgress(0);
        toast.success('Image uploaded successfully', { position: 'top-right' });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (file) {
      startUpload();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const triggerSubmit = () => {
    console.log('triggerSubmit');
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
    // onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        type='button'
        radius='sm'
        color='primary'
        className='border'
      >
        Publish post
      </Button>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <Container className='py-10 h-full max-w-screen-lg'>
              <ModalHeader className='flex flex-col gap-1 text-2xl mb-4'>
                Social preview
              </ModalHeader>
              <ModalBody className='grid grid-cols-2 items-center '>
                <div className='pr-20'>
                  <p className='mb-2 text-sm'>
                    Upload a cover image for your post
                  </p>
                  <div className='flex flex-col gap-4'>
                    <SingleImageDropzone
                      value={file}
                      className='w-full h-52'
                      dropzoneOptions={{
                        maxSize: 1024 * 1024 * 2, // 2MB
                      }}
                      onChange={(file) => {
                        setFile(file ?? null);
                      }}
                    />
                    <Progress
                      size='sm'
                      aria-label='Loading...'
                      value={progress}
                      className={`opacity-0 ${progress ? 'opacity-100' : ''}`}
                    />
                  </div>
                </div>
                <div>
                  <p className='mb-2 text-sm'>
                    Include tags related to your post for better discoverability
                  </p>
                  <div className='flex flex-col mb-4'>
                    <TagInput control={control} />
                  </div>

                  <div className='flex flex-col mb-4'>
                    <p className='mb-2 text-sm'>
                      A short summary for your post (this will be shown in
                      the preview)
                    </p>
                    <Textarea
                      type='summary'
                      id='summary'
                      label='Summary'
                      variant='faded'
                      radius='sm'
                      description='A short introdution to your post (optional).'
                      {...register('summary')}
                    />
                    {errors.summary && (
                      <p className='px-1 text-xs text-red-600'>
                        {errors?.summary.message}
                      </p>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onPress={triggerSubmit} radius='sm' isLoading={isSubmitting}>
                  {isSubmitting ? 'Publishing...' : 'Proceed to publish'}
                </Button>
              </ModalFooter>
            </Container>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
