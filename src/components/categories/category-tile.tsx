import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CategoriesNavigationType } from '@bic_todo/navigation/types';
import { Box, Text } from '@bic_todo/utils/theme';
import { Entypo, FontAwesome } from '@expo/vector-icons';

interface CategoryTileProps {
  category: ICategory;
}

const CategoryTile = (props: CategoryTileProps) => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const navigateToCreateOrUpdateCategory = () => {
    navigation.navigate('CreateOrUpdateCategory', {
      category: props.category,
    });
  };

  const navigateToCategoryScreen = () => {
    navigation.navigate('CategoryTasks', {
      id: props.category.id,
    });
  };

  return (
    <Pressable onPress={navigateToCategoryScreen}>
      <Box bg="lightGray" p="4" borderRadius="rounded24">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Box flexDirection="row">
            <FontAwesome name="circle" size={20} color={props.category.color} />
            <Text
              variant="title"
              fontWeight="600"
              ml="3"
              style={{ color: props.category.color }}>
              {props.category.name}
            </Text>
          </Box>
          <Pressable onPress={navigateToCreateOrUpdateCategory}>
            <Entypo name="dots-three-vertical" size={16} />
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};

export default CategoryTile;

const styles = StyleSheet.create({});
