import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Submission } from '../../../resolvers';
import DOMPurify from 'dompurify';
import { CustomModal } from '../../common';
import StarRating from '../../common/StarRating';
import ReviewForm from './Forms/CreateReviewForm';

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

  const toggleExpand = (id: string) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
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
      size="lg"
      footer={<></>}
      body={
        <VStack spacing={4} pb={4}>
          {submissions.map(submission => (
            <Box
              key={submission.id}
              width="100%"
              p={4}
              borderWidth="1px"
              borderRadius="md"
            >
              <HStack
                justifyContent="space-between"
                onClick={() => toggleExpand(submission.id)}
                cursor="pointer"
              >
                <HStack>
                  <Avatar src={submission?.user?.profilePicture} />
                  <Text fontWeight="bold">{submission.user?.username}</Text>
                </HStack>
                <HStack>
                  {submission.reviews && submission.reviews.length > 0 && (
                    <Text color="green.500" fontWeight="bold">
                      Reviewed
                    </Text>
                  )}
                  <Text color={'gray'}>
                    {new Date(submission.createdAt).toLocaleString()}
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
                  <Box overflow={'scroll'} height="100px">
                    {renderHTML(submission.submissionText)}
                  </Box>
                  {console.log({ submission })}
                  {submission.reviews && submission.reviews.length > 0 ? (
                    <VStack spacing={2} mt={2} align="start">
                      {submission.reviews.map(review => (
                        <Box
                          key={review.id}
                          p={2}
                          borderWidth="1px"
                          borderRadius="md"
                          width="100%"
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
