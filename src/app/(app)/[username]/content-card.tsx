import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { PostContentProps } from "./[slug]/page-content";

const ContentCard = ({ title, body }:any) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardBody>
        <p className="text-sm">{body}</p>
      </CardBody>
    </Card>
  );
};

export default ContentCard