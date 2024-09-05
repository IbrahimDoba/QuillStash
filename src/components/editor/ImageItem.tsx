import React, { useEffect, useState } from 'react';
import type { Editor } from '@tiptap/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { ImageIcon } from 'lucide-react';
import { SingleImageDropzone } from '../ui/image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { Progress } from '@nextui-org/react';

function ImageItem({ editor }: { editor: Editor }) {
  const [file, setFile] = useState<File | null>(null); // is actually never a sting just to satisfy edgestore type
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number | null>(null);

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
        setProgress(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
    }
  }, [imageUrl, editor]);

  return (
    <>
      <Button
        isIconOnly
        className='border-none'
        size='sm'
        radius='sm'
        variant={editor.isActive('image') ? 'flat' : 'ghost'}
        type='button'
        title='image'
        onClick={onOpen}
      >
        <ImageIcon size={18} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Upload Image
              </ModalHeader>
              <ModalBody>
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
                  {progress && (
                    <Progress
                      size='sm'
                      aria-label='Loading...'
                      value={progress}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' radius='sm' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' radius='sm' onClick={startUpload}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageItem;
