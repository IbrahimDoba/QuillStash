"use client"
import { useState } from 'react';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true); 
  };

  const closeHandler = () => {
    setIsModalOpen(false);
    setEmail(''); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Join QuillGen&apos;s Waitlist!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Be the first to experience our AI-powered YouTube thumbnail generation tool. Get early access to create engaging thumbnails!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Input
            isClearable
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full"
          />
          <Button type="submit" variant="solid" color="primary" className="w-full">
            Join Waitlist
          </Button>
        </form>

        <Modal isOpen={isModalOpen} onClose={closeHandler}>
          <ModalContent>
            <ModalHeader>
              <h2 className="text-xl font-bold">Thank You!</h2>
            </ModalHeader>
            <ModalBody>
              <p>Your email has been added to our waitlist. Stay tuned for exciting updates!</p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={closeHandler} variant="flat">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
