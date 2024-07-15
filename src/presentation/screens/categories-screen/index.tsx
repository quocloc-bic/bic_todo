import { FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Box } from '@bic_todo/utils/theme';
import CreateNewCategory from '@bic_todo/presentation/components/categories/create-new-category';
import CategoryTile from '@bic_todo/presentation/components/categories/category-tile';
import { useCategoriesScreen } from '@bic_todo/adapters/categories';
import { ICategory } from '@bic_todo/domain/entities/category';

const CategoriesScreen = () => {
  const adapter = useCategoriesScreen();

  useEffect(() => {
    adapter.fetchAllCategories();
  }, []);

  const renderItem = ({ item }: { item: ICategory }) => (
    <CategoryTile category={item} />
  );

  return (
    <Box flex={1} px="4" py="4" bg="white">
      <FlatList
        data={adapter.categories}
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
