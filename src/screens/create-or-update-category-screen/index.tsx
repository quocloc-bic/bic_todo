import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  CategoriesNavigationType,
  CategoriesStackParams,
} from '@bic_todo/navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Box, Theme } from '@bic_todo/utils/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCategoryColorPalette } from '@bic_todo/utils/helpers';
import { useAppDispatch } from '@bic_todo/redux/hooks';
import * as actions from './actions';
import Button from '@bic_todo/components/shared/button';

const COLORS = getCategoryColorPalette();

const DEFAULT_COLOR = COLORS[0];

type CreateOrUpdateCategoryScreenProp = RouteProp<
  CategoriesStackParams,
  'CreateOrUpdateCategory'
>;

const CreateOrUpdateCategoryScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<CreateOrUpdateCategoryScreenProp>();
  const navigation = useNavigation<CategoriesNavigationType>();
  const theme = useTheme<Theme>();

  const { category } = route.params;
  const isUpdating = category ? true : false;
  const isRemovable = isUpdating && !category?.isDefault;

  const [newCategory, setNewCategory] = useState<UpdatingCategory>({
    name: category?.name ?? '',
    color: category?.color ?? DEFAULT_COLOR,
  });

  const deleteCategory = () => {
    if (category) {
      dispatch(actions.deleteCategory(category.id))
        .then(() => {
          navigation.pop();
        })
        .catch(error => {
          Alert.alert('Error', error);
        });
    }
  };

  const createNewCategory = () => {
    if (isUpdating && category) {
      const updatedCategory: ICategory = {
        ...category,
        ...newCategory,
      };

      dispatch(actions.updateCategory(updatedCategory))
        .then(() => {
          navigation.pop();
        })
        .catch(error => {
          Alert.alert('Error', error);
        });
    } else {
      dispatch(actions.createNewCategory(newCategory))
        .then(() => {
          navigation.pop();
        })
        .catch(error => {
          Alert.alert('Error', error);
        });
    }
  };

  const updateColor = (color: string) => {
    setNewCategory(prev => {
      return {
        ...prev,
        color,
      };
    });
  };

  const renderDeletingButton = () => {
    return (
      isRemovable && (
        <Pressable onPress={deleteCategory}>
          <MaterialCommunityIcons
            name="delete"
            size={24}
            color={theme.colors.red500}
          />
        </Pressable>
      )
    );
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      navigation.setOptions({
        title: isUpdating ? 'Update category' : 'Create category',
        headerRight: () => renderDeletingButton(),
      });
    });

    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  return (
    <Box flex={1} px="4" bg="white">
      <Box height={16} />
      <Box bg="gray250" borderRadius="rounded24">
        <TextInput
          style={{
            fontSize: 20,
            lineHeight: 26,
            padding: 16,
            color: newCategory.color,
          }}
          value={newCategory.name}
          maxLength={36}
          placeholder="Create new category"
          placeholderTextColor={theme.colors.gray500}
          onChangeText={text => {
            setNewCategory(prev => {
              return {
                ...prev,
                name: text,
              };
            });
          }}
        />
      </Box>
      <Box height={24} />
      <Box bg="gray250" p="4" borderRadius="rounded20">
        <Box flexDirection="row" justifyContent="space-evenly">
          {COLORS.map(color => {
            return (
              <Pressable
                key={color}
                onPress={() => {
                  updateColor(color);
                }}>
                <Box
                  style={{
                    backgroundColor: color,
                  }}
                  width={24}
                  height={24}
                  borderRadius="rounded20"></Box>
              </Pressable>
            );
          })}
        </Box>
      </Box>

      <Box height={24} />

      <Box position="absolute" bottom={16} left={16} right={16}>
        <Button
          disabled={newCategory.name == ''}
          label={isUpdating ? 'Edit category' : 'Create new category'}
          onPress={createNewCategory}
        />
      </Box>
    </Box>
  );
};

export default CreateOrUpdateCategoryScreen;

const styles = StyleSheet.create({});
