import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@bic_todo/redux/hooks';
import { fetchAllCategories } from './actions';
import { Box } from '@bic_todo/utils/theme';
import CreateNewCategory from '@bic_todo/components/categories/create-new-category';
import CategoryTile from '@bic_todo/components/categories/category-tile';

const CategoriesScreen = () => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const renderItem = ({ item }: { item: ICategory }) => (
    <CategoryTile category={item} />
  );

  return (
    <Box flex={1} px="4" py="4" bg="white">
      <FlatList
        data={categories}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Box height={14} />}
        keyExtractor={item => item.id.toString()}
      />
      <CreateNewCategory />
    </Box>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
