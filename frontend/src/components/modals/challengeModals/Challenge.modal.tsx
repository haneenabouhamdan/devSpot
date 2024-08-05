import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Grid,
  GridItem,
  FormLabel,
  HStack,
  Text,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DOMPurify from 'dompurify';
import RichTextEditor from '../../common/RichTextEditor';
import StarRating from '../../common/StarRating';
import {
  Submission,
  SubmissionStatus,
  useCreateSubmission,
} from '../../../resolvers';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  difficultyLevel: string;
  challengeId: string;
  isSolvedByUser: boolean;
  submissions?: Submission[];
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  difficultyLevel,
  challengeId,
  isSolvedByUser,
  submissions,
}) => {
  const [showInput, setShowInput] = useState(!isSolvedByUser);
  const [error, setError] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const sanitizedDescription = DOMPurify.sanitize(description);

  const { createSubmission } = useCreateSubmission();
  const toast = useToast();

  const renderHTML = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return Array.from(template.content.childNodes).map((node, index) => {
      if (node.nodeName === 'PRE') {
        return (
          <SyntaxHighlighter
            key={index}
            style={codeStyle}
            language="javascript"
          >
            {node.textContent || ''}
          </SyntaxHighlighter>
        );
      }
      return (
        <Box key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
      );
    });
  };

  const getRate = (level: string): number => {
    if (level === 'easy') return 1;
    if (level === 'medium') return 3;
    return 5;
  };

  const onConfirm = async () => {
    const userId = localStorage.getItem('uId');
    if (!userId) return;

    const formattedSubmission = DOMPurify.sanitize(submissionText);
    if (!formattedSubmission || !submissionText) {
      setError('Submission Text is required');
      return;
    }

    await createSubmission({
      payload: {
        challengeId,
        submissionText: formattedSubmission,
        createdBy: userId,
        status: SubmissionStatus.SUBMITTED,
      },
      onCompleted: () => {
        toast({
          description: 'Answer submitted successfully',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
        setShowInput(false);
        onClose();
        setError('');
      },
    });
  };

  const gridTemplateColumns = useBreakpointValue({
    base: '1fr',
    md: 'repeat(2, 1fr)',
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={showInput ? 'full' : 'xl'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="white" p={5}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showInput ? (
            <Grid templateColumns={gridTemplateColumns} gap={8}>
              <GridItem>
                <Box
                  mb={2}
                  overflow="scroll"
                  height={showInput ? '500px' : '300px'}
                >
                  {renderHTML(sanitizedDescription)}
                </Box>

                <Flex mt={4} justifyContent="flex-start">
                  <HStack>
                    <Text fontSize="sm" color="gray.500">
                      Difficulty:
                    </Text>
                    <StarRating rating={getRate(difficultyLevel)} />
                  </HStack>
                </Flex>
              </GridItem>
              <GridItem>
                <FormLabel fontWeight={'500'} fontSize={'lg'}>
                  Submit your answer
                </FormLabel>
                <RichTextEditor
                  value={submissionText}
                  onChange={value => setSubmissionText(value)}
                  placeholder={''}
                />

                {!!error && !submissionText && (
                  <Text mt={4} color="red">
                    {error}
                  </Text>
                )}
              </GridItem>
            </Grid>
          ) : (
            <>
              <Box mb={2} overflow="scroll" height="300px">
                {renderHTML(sanitizedDescription)}
              </Box>
              <Flex mt={4} justifyContent="flex-start">
                <HStack>
                  <Text fontSize="sm" color="gray.500">
                    Difficulty: ({difficultyLevel})
                  </Text>
                  <StarRating rating={getRate(difficultyLevel)} />
                </HStack>
              </Flex>
              <Text fontSize="small" color="gray.500" fontWeight={'bold'}>
                ({submissions?.length}) submissions
              </Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {!isSolvedByUser && (
            <Flex width="100%" justifyContent="end">
              <Button colorScheme="green" width="200px" onClick={onConfirm}>
                Submit
              </Button>
            </Flex>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChallengeModal;
