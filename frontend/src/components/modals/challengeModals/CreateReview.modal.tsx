import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Submission } from '../../../resolvers';
import DOMPurify from 'dompurify';
import { CustomModal } from '../../common';
import StarRating from '../../common/StarRating';
import ReviewForm from './Forms/CreateReviewForm';
import { formatDate } from '../../../helpers';

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Submission[];
  isCreatedByAuthUser?: boolean;
}

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  isOpen,
  onClose,
  submissions,
  isCreatedByAuthUser,
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const modalSize = useBreakpointValue({ base: 'full', md: 'lg' });

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const renderHTML = (html: string) => {
    const sanitizedText = DOMPurify.sanitize(html);
    const template = document.createElement('template');
    template.innerHTML = sanitizedText.trim();
    return Array.from(template.content.childNodes).map((node, index) => {
      if (node.nodeName === 'PRE') {
        return <></>;
      }
      return (
        <Box key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
      );
    });
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={closeModal}
      title={'Submissions'}
      loading={false}
      size={modalSize}
      footer={<></>}
      body={
        <VStack spacing={4} pb={4}>
          {submissions.map(submission => (
            <Box
              key={submission.id}
              width="100%"
              p={2}
              borderWidth="1px"
              borderRadius="md"
            >
              {submission.reviews && submission.reviews.length > 0 && (
                <Text
                  color="green.500"
                  fontWeight="bold"
                  ml="40%"
                  fontSize={{ base: 'x-small', md: 'medium' }}
                >
                  Reviewed
                </Text>
              )}
              <HStack
                justifyContent="space-between"
                onClick={() => toggleExpand(submission.id)}
                cursor="pointer"
              >
                <HStack>
                  <Avatar src={submission?.user?.profilePicture} />
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 'small', md: 'medium' }}
                  >
                    {submission.user?.username}
                  </Text>
                </HStack>
                <HStack>
                  <Text
                    color={'gray'}
                    fontSize={{ base: 'x-small', md: 'medium' }}
                  >
                    {formatDate(
                      new Date(submission.createdAt),
                      'DD-MM-YYYY, HH:mm'
                    )}
                  </Text>
                  <IconButton
                    aria-label="Expand Submission"
                    icon={
                      expanded === submission.id ? (
                        <ChevronDownIcon />
                      ) : (
                        <ChevronRightIcon />
                      )
                    }
                    size="sm"
                    variant="ghost"
                  />
                </HStack>
              </HStack>
              {expanded === submission.id && (
                <VStack spacing={2} mt={2}>
                  <Box overflow={'scroll'} maxH="200px">
                    {renderHTML(submission.submissionText)}
                  </Box>
                  {submission.reviews && submission.reviews.length > 0 ? (
                    <VStack spacing={2} mt={2} align="start" w="100%">
                      {submission.reviews.map(review => (
                        <Box
                          key={review.id}
                          p={2}
                          borderWidth="1px"
                          borderRadius="md"
                          w="100%"
                        >
                          <HStack justifyContent="space-between">
                            <StarRating rating={review.score} />
                          </HStack>
                          <Text mt={1}>{review.comment}</Text>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    isCreatedByAuthUser && (
                      <ReviewForm
                        submissionId={submission.id}
                        onReviewSubmit={() => setExpanded(null)}
                      />
                    )
                  )}
                </VStack>
              )}
            </Box>
          ))}
        </VStack>
      }
    />
  );
};

export default CreateReviewModal;
