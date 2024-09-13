import { siteConfig } from "@/lib/site-config";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  username?: string;
  userEmail?: string;
}

export const WelcomeEmail = ({
  username,
  userEmail,
}: VercelInviteUserEmailProps) => {
  const previewText = `Welcome to ${siteConfig.title}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${siteConfig.url}/logo.png`}
                width="40"
                height="37"
                alt={siteConfig.title}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              <strong>{previewText}</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              we&apos;re excited to have you join our community and hope you
              find it beneficial
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              You can get started publishing your first article, or Join the
              community discord to connect with others.
            </Text>

            <Section className="mb-[32px] mt-[32px] flex gap-6">
              <Button
                className="rounded bg-primary px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`${siteConfig.url}/new`}
              >
                Write an article
              </Button>
              <Button
                className="rounded bg-default px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href="https://discord.gg/vkYvY4D3RA"
              >
                Join us on discord
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This email was intended for{" "}
              <span className="text-black">{userEmail}</span>
              You can ignore this email. If you recieved it and are not the
              intended recipient.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
