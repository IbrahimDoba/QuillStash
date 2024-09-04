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

import { Card, CardBody, Button } from '@nextui-org/react';

const DiscordCardComponent = ({  }) => {
  return (
    <Card className="max-w-md rounded-lg shadow-lg mt-5">
      <CardBody>
        <h3 className="text-2xl font-bold text-blue-600 mb-4">
          Join Our Community
        </h3>
        <p className="text-base text-gray-600 mb-6">
          Be a part of our growing community! Connect, share, and explore
          discussions with other like-minded individuals. We would love to have
          you with us!
        </p>
        <a href={process.env.PERMANENT_DISCORD_LINK} className="w-full">
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
            size="lg"
          >
            Join Our Community
          </Button>
        </a>
      </CardBody>
    </Card>
  );
};

export default DiscordCardComponent;
