import { Card, CardBody, Button, CardHeader, CardFooter, Link } from '@nextui-org/react';
import { ArrowUpRight } from 'lucide-react';

const DiscordCard = () => {
  return (
    <Card radius="sm" shadow="sm" className="max-w-md">
      <CardHeader>
        <h4 className="xl:text-xl font-bold text-primary">
        Ready to Write?
        </h4>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-foreground-500 font-semibold">
          Are you passionate about sharing knowledge or telling stories? Join our Discord community today and send a request to become a writer. 
        </p>
      </CardBody>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
          href={process.env.PERMANENT_DISCORD_LINK}
          as={Link}
        >
          <span>
            Join the Community
          </span>
          <ArrowUpRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiscordCard;
