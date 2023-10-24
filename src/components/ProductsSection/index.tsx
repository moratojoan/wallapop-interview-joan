'use client';

import { useItems } from '@/providers/ItemsProvider';
import { Button } from '@/components/ui/Button';
import { ProductListItem } from '../ProductListItem';

export function ProductsSection() {
  const {
    itemsResponse: { data, error },
    fetchItems,
  } = useItems();
  return (
    <section>
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <ul>
            {data.items.map((item) => (
              <ProductListItem
                /*
                  As the items have no Id, I use the description as key to
                  avoid the case that more than one item has the same title.
                */
                key={item.title + item.description}
                item={item}
              />
            ))}
          </ul>
          {data.meta.pagination.hasNextPage && (
            <Button
              size="large"
              onClick={() => {
                fetchItems({ page: data.meta.pagination.page + 1 });
              }}
            >
              Show more items
            </Button>
          )}
        </>
      )}
    </section>
  );
}
