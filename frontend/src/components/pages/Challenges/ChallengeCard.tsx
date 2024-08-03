import React, { useState } from 'react';
import {
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  Box,
  HStack,
  CardFooter,
  Button,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import StarRating from '../../common/StarRating';
import DOMPurify from 'dompurify';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import ChallengeModal from '../../modals/challengeModals/Challenge.modal';
import { Submission } from '../../../resolvers';
import CreateReviewModal from '../../modals/challengeModals/CreateReview.modal';

interface ChallengeCardProps {
  title: string;
  description: string;
  difficultyLevel: string;
  id: string;
  createdBy: string;
  submissions: Submission[];
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  difficultyLevel,
  id,
  submissions,
  createdBy,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const getRate = (level: string): number => {
    if (level == 'easy') return 1;
    if (level == 'medium') return 3;
    return 5;
  };

  const sanitizedDescription = DOMPurify.sanitize(description);
  const userId = localStorage.getItem('uId');

  const renderHTML = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return Array.from(template.content.childNodes).map((node, index) => {
      if (node.nodeName === 'PRE') {
        return <></>;
      }
      return (
        <Box key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
      );
    });
  };

  const isCreatedByAuthUser = createdBy === userId;
  const isSolvedByUser = submissions.some(sub => sub.createdBy === userId);

  return (
    <>
      <Tooltip
        label="Click to view details"
        color="white"
        bgColor={'orange.500'}
        p={1}
        fontSize={'x-small'}
        placement="top"
      >
        <Card variant="outline" boxShadow="md" cursor="pointer">
          <CardHeader p={2}>
            <Flex align="center">
              <Text fontWeight="bold" fontSize="lg" pl={2}>
                {title}
              </Text>
            </Flex>
          </CardHeader>

          <CardBody
            p={5}
            pb={0}
            pt={0}
            height="100px"
            onClick={() => setIsModalOpen(true)}
          >
            <Box overflow={'scroll'} height="100px">
              {renderHTML(sanitizedDescription)}
            </Box>

            <Text fontSize="sm" color="gray.500" mt={2}>
              Difficulty: ({difficultyLevel})
            </Text>
            <HStack pb={2} justifyContent={'center'}>
              <StarRating rating={getRate(difficultyLevel)} />
            </HStack>
          </CardBody>
          <CardFooter pt={0}>
            <Flex width="100%" justifyContent="space-between" mb={0} gap={2}>
              <Button
                justifyContent={'center'}
                isDisabled={!submissions || submissions.length === 0}
                onClick={() => setIsReviewModalOpen(!isReviewModalOpen)}
              >
                <Text fontSize="small" color="gray.500" fontWeight={'bold'}>
                  ({submissions.length}) submissions
                </Text>
              </Button>
              {!isSolvedByUser ? (
                <Button
                  colorScheme="green"
                  width="45%"
                  onClick={() => setIsModalOpen(true)}
                >
                  Solve
                </Button>
              ) : (
                <Tooltip label="Solved" color={'gray.300'}>
                  <IconButton
                    icon={<IoMdCheckmarkCircleOutline size={'lg'} />}
                    aria-label={'solved'}
                    p={1}
                  />
                </Tooltip>
              )}
            </Flex>
          </CardFooter>
        </Card>
      </Tooltip>
      <ChallengeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        challengeId={id}
        isSolvedByUser={isSolvedByUser}
        submissions={submissions}
        difficultyLevel={difficultyLevel}
      />
      <CreateReviewModal
        isOpen={isReviewModalOpen}
        isCreatedByAuthUser={isCreatedByAuthUser}
        onClose={() => setIsReviewModalOpen(false)}
        submissions={submissions}
      />
    </>
  );
};

export default ChallengeCard;
