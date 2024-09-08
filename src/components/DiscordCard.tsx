// import React from 'react';
// // import { Card, CardHeader, CardBody, CardFooter, Button } from '@/components/ui/card';
// import { Discord } from './Icons';
// import { Card,CardHeader,CardBody, CardFooter, Button } from '@nextui-org/react';

// const DiscordCardComponent = ({  }) => {
//   return (
//     <Card className="w-full max-w-md mx-auto bg-gray-900 text-white shadow-xl">
//       <CardHeader className="flex flex-col items-center justify-center py-6">
//         <h2 className="text-xl font-bold mt-4">Join Our Discord Community</h2>
//       </CardHeader>
//       <CardBody className="text-center px-6">
//         <p className="text-gray-300">Connect with fellow enthusiasts, share ideas, and stay updated with the latest news and events!</p>
//       </CardBody>
//       <CardFooter className="flex justify-center pb-6">
//         <Button
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           <a href={'communityLink'} target="_blank" rel="noopener noreferrer">
//             Join Our Community
//           </a>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default DiscordCardComponent;

import { Card, CardBody, Button, CardHeader, CardFooter, Link } from '@nextui-org/react';
import { ArrowUpRight } from 'lucide-react';

const DiscordCardComponent = ({  }) => {
  return (
    <Card radius='sm' shadow='sm' className="max-w-md">
      <CardHeader>
        <h4 className="text-2xl font-bold text-primary">
          Join the community
        </h4>
      </CardHeader>
      <CardBody>
        <p className="text-base text-foreground-500">
          Be a part of our growing community. Connect, share, and discuss with like-minded individuals. We would love to have
          you with us!
        </p>
      </CardBody>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
          href={process.env.PERMANENT_DISCORD_LINK}
          size="lg"
          as={Link}
        >
          <span>
            Join us today
          </span>
          <ArrowUpRight size={16}/>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiscordCardComponent;
