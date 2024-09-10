import { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { SingleImageDropzone } from "@/components/ui/image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import TagInput from "@/components/editor/TagInput";
import {
  useController,
  Control,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { PostValues } from "@/lib/zod";
import Container from "@/components/Container";
import { toast } from "sonner";
import ErrorMessage from "../ui/error-message";
import { ArrowLeft, X } from "lucide-react";

interface ConfirmModalProps {
  control: Control<PostValues>;
  register: UseFormRegister<PostValues>;
  setValue: UseFormSetValue<PostValues>;
  errors: FieldErrors<PostValues>;
  formRef: React.RefObject<HTMLFormElement>;
  isSubmitting: boolean;
  defaultCoverImage?: string | null;
}

export default function PublishSettings({
  control,
  register,
  setValue,
  errors,
  formRef,
  isSubmitting,
  defaultCoverImage,
}: ConfirmModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    defaultCoverImage || null,
  );
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);

  const startUpload = async () => {
    if (!file) return;

    await edgestore.myPublicImages
      .upload({
        file,
        input: { type: "bodyImage" },
        onProgressChange: setProgress,
      })
      .then((res) => {
        setImageUrl(res.url);
        setValue("coverImage", res.url);
        setProgress(0);
        toast.success("Image uploaded successfully", { position: "top-right" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to upload image, please try again", {
          position: "top-right",
        });
      });
  };

  useEffect(() => {
    if (file) {
      startUpload();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const triggerSubmit = () => {
    console.log("triggerSubmit");
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        type="button"
        radius="sm"
        color="primary"
        className="border"
      >
        Publish post
      </Button>
      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        closeButton={
          <Button type="button" isIconOnly>
            <X size={16} />
          </Button>
        }
      >
        <ModalContent>
          {(onClose) => (
            <Container className="h-full max-w-screen-lg py-6">
              <ModalHeader className="mb-4 flex flex-col gap-1 border-b text-center text-2xl dark:border-b-foreground-100">
                Publish settings
              </ModalHeader>
              <ModalBody className="grid items-center pt-4 lg:grid-cols-2">
                <div className="lg:pr-20">
                  <div className="flex flex-col gap-4">
                    <SingleImageDropzone
                      value={file || imageUrl}
                      className="h-52 w-full"
                      dropzoneOptions={{
                        maxSize: 1024 * 1024 * 2, // 2MB
                      }}
                      onChange={(newFile) => {
                        if (newFile) {
                          setFile(newFile);
                        }
                      }}
                    />
                    <Progress
                      size="sm"
                      aria-label="Loading..."
                      value={progress}
                      className={`opacity-0 ${progress ? "opacity-100" : ""}`}
                    />
                  </div>
                  <p className="text-sm">
                    Upload a cover image for your article this will be shown in
                    the preview of your article throughout the site and whenever
                    your post is shared on social media. (this is optional but
                    highly recommended.)
                  </p>
                  {/* TODO give users option to show or hide cover image in the article page */}
                </div>
                <div>
                  <p className="mb-2 text-sm">
                    Include tags related to your post for better discoverability
                  </p>
                  <div className="mb-4 flex flex-col">
                    <TagInput control={control} />
                  </div>

                  <div className="mb-4 flex flex-col">
                    <p className="mb-2 text-sm">
                      A short description for your post (this will be shown in
                      the preview)
                    </p>
                    <Textarea
                      id="summary"
                      label="Summary"
                      radius="sm"
                      description="A short introdution to your post (optional)."
                      {...register("summary")}
                    />
                    {errors.summary && (
                      <ErrorMessage
                        message={errors.summary.message}
                        className="px-1"
                      />
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={triggerSubmit}
                  radius="sm"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Proceed to publish"}
                </Button>
              </ModalFooter>
            </Container>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
