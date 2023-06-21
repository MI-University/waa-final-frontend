import { PropertyCard } from '@components/properties';
import { EmptyPanel, Loader } from '@components/ui';
import { useData } from '@store/providers/Provider';

const MySavedProperties = () => {
  const { properties } = useData();

  return (
    <div>
      <div>
        {!properties.length ? (
          <EmptyPanel />
        ) : (
          <div className="grid grid-cols-4 gap-0">
            {properties?.map((item) => (
              <PropertyCard item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySavedProperties;
