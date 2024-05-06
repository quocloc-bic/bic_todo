import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text, Theme } from '@bic_todo/utils/theme';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CategoriesNavigationType } from '@bic_todo/navigation/types';
import { useTheme } from '@shopify/restyle';

const CreateNewCategory = () => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const theme = useTheme<Theme>();

  const navigateToCreateOrUpdateCategory = () => {
    navigation.navigate('CreateOrUpdateCategory', {});
  };

  return (
    <Pressable onPress={navigateToCreateOrUpdateCategory}>
      <Box
        p="4"
        bg="purple100"
        borderRadius="rounded24"
        flexDirection="row"
        alignItems="center">
        <Feather name="plus" size={24} color={theme.colors.purple500} />
        <Text variant="title" fontWeight="600" color="purple600" ml="3">
          Create new list
        </Text>
      </Box>
    </Pressable>
  );
};

export default CreateNewCategory;

const styles = StyleSheet.create({});
