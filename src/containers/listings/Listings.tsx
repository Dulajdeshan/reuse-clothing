import React, { useEffect, useState } from 'react';
import './Listings.css';
import ListingSearchCard from '../../components/listingSearchCard/ListingSearchCard';
import ListingTable from '../../components/listingTable/ListingTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  handleGetListings,
  handleGetSellers,
} from '../../redux/actions/customerActions';

export default function Listings() {
  const dispatch = useAppDispatch();
  const listings = useAppSelector((state) => state.customer.listings);

  const [filteredListings, setFilteredListings] = useState(listings);

  useEffect(() => {
    dispatch(handleGetListings());
    dispatch(handleGetSellers());
  }, []);

  useEffect(() => {
    setFilteredListings(listings);
  }, [listings]);

  const handleFilter = (
    count: any,
    garmentType: string,
    garmentDistrict: string
  ) => {
    let newListings = listings;
    if (count !== '') {
      newListings = newListings.filter((item: any) => {
        return item.garmentCount >= parseInt(count, 10);
      });
    } else {
      newListings = listings;
    }
    if (garmentType !== 'all' && garmentType !== '') {
      newListings = newListings.filter((item: any) => {
        return item.garmentType === garmentType;
      });
    }

    if (garmentDistrict !== 'all' && garmentDistrict !== '') {
      newListings = newListings.filter((item: any) => {
        return item.district === garmentDistrict;
      });
    }

    setFilteredListings(newListings);
  };

  return (
    <div className="listings-root">
      <ListingSearchCard loading={false} handleSubmit={handleFilter} />

      <ListingTable data={filteredListings} />
    </div>
  );
}
