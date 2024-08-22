import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { LinkIcon, Globe } from 'lucide-react';
import { Github, Discord, X } from '@/components/Icons';

interface LinksModalProps {
  links: string[];
};

function LinksModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className='text-blue flex items-center gap-1 text-sm font-medium'
      >
        <LinkIcon size={16} />
        Links
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Doba&apos;s Social Links
              </ModalHeader>
              <ModalBody>
                <ul className='flex flex-col gap-4'>
                  <li className='flex gap-2 items-center'>
                    <Globe className='size-4' />
                    <a href='https://ibrahimdoba.dev'>Website</a>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <X className='size-4' />
                    <a href='https://x.com/ibrahimdoba/'>Twitter (X)</a>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <Github className='size-4' />
                    <a href='https://github.com/ibrahimdoba/'>Github</a>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <Discord className='size-4' />
                    <a href='https://www.discord.gg/silverfangs/'>Discord</a>
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LinksModal;
