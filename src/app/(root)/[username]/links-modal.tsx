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
import { Github, Discord, X, Reddit, Linkedin } from '@/components/Icons';

interface LinksModalProps {
  socials: string[] | null;
  website: string | null;
  name: string;
}

function LinksModal({ name, website, socials }: LinksModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getLinkDetails = (url: string) => {
    if (url.includes('github.com')) {
      return { Icon: Github, label: 'Github' };
    } else if (url.includes('discord.gg') || url.includes('discord.com')) {
      return { Icon: Discord, label: 'Discord' };
    } else if (url.includes('x.com') || url.includes('twitter.com')) {
      return { Icon: X, label: 'Twitter (X)' };
    }  else if (url.includes('reddit.com')) {
      return { Icon: Reddit, label: 'Reddit' };
    }
    // Fallback for unknown links
    return { Icon: LinkIcon, label: 'Link' };
  };

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
                {name}&apos;s Links
              </ModalHeader>
              <ModalBody>
                <ul className='flex flex-col gap-4'>
                  {website && (
                    <li className='flex gap-2 items-center'>
                      <Globe className='size-4' />
                      <a href={website ?? undefined} target='_blank'>
                        Website
                      </a>
                    </li>
                  )}
                  {/* socials */}
                  {socials?.map((socialUrl, index) => {
                    const { Icon, label } = getLinkDetails(socialUrl);
                    return (
                      <li key={`${socialUrl}-${index}`} className='flex gap-2 items-center'>
                        <Icon className='size-4' />
                        <a
                          href={socialUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' size='sm' radius='sm' onPress={onClose}>
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
