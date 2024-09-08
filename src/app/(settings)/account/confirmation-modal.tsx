import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function ConfirmationModal({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        color="warning"
        onPress={onOpen}
        type="button"
        radius="sm"
        className="capitalize"
      >
        Delete Account
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Delete Account?</h3>
              </ModalHeader>
              <ModalBody>
                <p>
                  Before you proceed please note that this action is
                  irreversible and will result in the loss of your data,
                  including your comments, bookmarks and settings. Your posts
                  will no longer appear on the site but can still be viewed by
                  people with the link.
                </p>
                <p>
                  if you are facing any issues consider contacting us via{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold underline"
                  >
                    email
                  </a>{" "}
                  or on
                  {" "}
                  <a
                    href="https://discord.gg/vkYvY4D3RA"
                    className="font-semibold underline"
                  >
                    discord
                  </a>
                  {" "}
                  before proceeding.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  CANCEL
                </Button>
                <Button color="danger" onPress={onClose} radius="sm">
                  DELETE
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
