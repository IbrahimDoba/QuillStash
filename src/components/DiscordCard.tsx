import { Card, CardBody, Button, CardHeader, CardFooter, Link } from '@nextui-org/react';
import { ArrowUpRight } from 'lucide-react';

const DiscordCard = ({  }) => {
  return (
    <Card radius='sm' shadow='sm' className="max-w-md">
      <CardHeader>
        <h4 className="xl:text-xl font-bold text-primary">
          Join the community
        </h4>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-foreground-500">
          Be a part of our growing community. Connect, share, and discuss with like-minded individuals. We would love to have
          you with us!
        </p>
      </CardBody>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
          href={process.env.PERMANENT_DISCORD_LINK}
          as={Link}
        >
          <span>
            Join us today
          </span>
          <ArrowUpRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiscordCard;
