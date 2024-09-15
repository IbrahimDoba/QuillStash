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
  Control,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormTrigger,
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
  trigger: UseFormTrigger<PostValues>;
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
  trigger,
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

  const hasErrors = Object.keys(errors).length > 0;

  const triggerSubmit = async () => {
    // const isValid = await trigger();
    if (hasErrors) {
      return toast.error("Please fill in all required fields", {
        position: "top-right",
      });
    }
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
              <ModalHeader className="mb-4 flex flex-col gap-1 border-b text-center dark:border-b-foreground-100">
                <p className="text-2xl">Publish Settings</p>
                <p className="text-foreground-500 font-normal text-sm">
                  Let&apos;s add some finishing touches to your article.
                </p>
                {hasErrors && (
                  <div className="mb-4 text-center">
                    {errors.title && (
                      <ErrorMessage message={errors.title.message} />
                    )}
                    {errors.body && (
                      <ErrorMessage message={errors.body.message} />
                    )}
                  </div>
                )}
              </ModalHeader>
              <div className="grid min-h-full overflow-y-auto md:pt-5">
                <ModalBody className="grid items-center max-sm:px-0 lg:grid-cols-2">
                  <div className="lg:pr-20">
                    <div className="flex flex-col gap-2">
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
                    <p className="text-xs text-foreground-500">
                      Upload a cover image for your article (optional), we will generate one for you if you don&apos;t have any.
                    </p>
                  </div>
                  <div>
                    <div className="mb-4 flex flex-col">
                      <TagInput control={control} />
                    </div>

                    <div className="mb-4 flex flex-col">
                      <Textarea
                        id="summary"
                        label="Description"
                        variant="faded"
                        radius="sm"
                        description="A short introdution to your post (optional)."
                        minRows={6}
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
                    onPress={onClose}
                    radius="sm"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    color="primary"
                    onPress={triggerSubmit}
                    radius="sm"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Publishing..." : "Confirm publish"}
                  </Button>
                </ModalFooter>
              </div>
            </Container>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
