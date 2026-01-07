import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Heading,
  Font,
  Section,
} from "@react-email/components";
import Link from "next/link";

type Props = {
  email: string;
  domain: string;
  text: string;
};
// TODO: Make a nicer email template
export default function EmailVerification(props: Props) {
  const { email, domain, text } = props;

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: `${domain}/fonts/Poppins-Regular.woff2`,
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body
        style={{
          padding: 0,
          margin: 0,
          fontFamily: "Poppins sans-serif",
          backgroundColor: "#f8f8f8",
        }}
      >
        <Container
          style={{
            backgroundColor: "#28A745",
            padding: "1.5rem",
          }}
        >
          <Heading
            style={{
              textAlign: "center",
              letterSpacing: "2px",
              color: "#ffffff",
            }}
          >
            Websendor
          </Heading>
        </Container>
        <Container
          style={{
            padding: "0 1rem",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              letterSpacing: "2px",
            }}
          >
            Hello {email},
          </Text>
          <Text
            style={{
              color: "#374151",
            }}
          ></Text>

          <Hr />
          <Section>
            <Text
              style={{
                color: "#374151",
              }}
            >
              {text}
            </Text>
            <Link
              href={`${domain}/${text}`}
              target="_blank"
              style={{
                color: "#0863f5ff",
              }}
            >
              Click here to verify your email address
            </Link>
            <Text
              style={{
                color: "#374151",
              }}
            >
              Websendor Team.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
