import { Box, Text } from '@bic_todo/utils/theme';
import { Pressable } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button = ({ label, onPress, disabled }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Box
        bg={disabled ? 'gray500' : 'primary'}
        py="3"
        borderRadius="rounded24">
        <Text variant="title" fontWeight="700" color="white" textAlign="center">
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Button;
