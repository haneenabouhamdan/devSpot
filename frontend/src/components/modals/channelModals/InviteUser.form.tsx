import {
  Box,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react';
import { FormInput } from '../../common';
import { AddIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import * as Yup from 'yup';

// Define the Yup schema
const emailSchema = Yup.string()
  .email('Invalid email address')
  .required('Email is required');

interface InviteUsersFormProps {
  onEmailsUpdate: (emails: string[]) => void;
}

export const InviteUsersForm = ({ onEmailsUpdate }: InviteUsersFormProps) => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addEmail = async () => {
    try {
      await emailSchema.validate(email);
      setEmails([...emails, email]);
      setEmail(''); // Clear the input field
      setError(null);
      onEmailsUpdate([...emails, email]); // Send updated emails to parent
    } catch (validationError: any) {
      setError(validationError?.message);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError(null); // Clear the error when user starts typing
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addEmail();
    }
  };

  const removeEmail = (index: number) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
    onEmailsUpdate(updatedEmails); // Send updated emails to parent
  };

  return (
    <Box mb={4} maxHeight="300px" overflowY="scroll">
      <Text className="gray" fontSize={'14px'} mb={2}>
        Members
      </Text>
      <Box alignItems={'center'} display="flex" flexDirection="column" pb="4">
        {emails.length > 0 && (
          <Menu>
            <MenuButton
              as={IconButton}
              // rightIcon={<ChevronDownIcon />}
              bgColor={'white'}
              color="black"
              _hover={{ bgColor: 'white' }}
            >
              <AvatarGroup size="md" max={2} p="6">
                {emails.map((email, index) => (
                  <Avatar
                    key={index}
                    name={email}
                    src={`https://api.adorable.io/avatars/285/${email}.png`}
                  />
                ))}
              </AvatarGroup>
            </MenuButton>
            <MenuList>
              {emails.map((email, index) => (
                <MenuItem
                  key={index}
                  justifyContent="space-between"
                  _hover={{ bg: 'gray.100' }}
                >
                  {email}
                  <IconButton
                    aria-label="Remove email"
                    icon={<CloseIcon />}
                    size="sm"
                    bg="transparent"
                    onClick={() => removeEmail(index)}
                  />
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </Box>
      <HStack mb={2} mt={2} justifyContent="space-between">
        <FormInput
          label=""
          ml="3"
          maxWidth={'95%'}
          placeholder="Email Address"
          value={email}
          onChange={e => handleEmailChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          onClick={addEmail}
          bgColor={'orange.500'}
          _hover={{ bgColor: 'orange.300' }}
          aria-label="Add email"
          icon={
            <AddIcon
              color="white"
              bgColor={'orange.500'}
              _hover={{ bgColor: 'orange.300' }}
            />
          }
        />
      </HStack>
      {error && <Text color="pink.500">{error}</Text>}
    </Box>
  );
};
