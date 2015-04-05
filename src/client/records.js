import Immutable from 'immutable';

export const LocatorItem = Immutable.Record({
  id: '',
  name: '',
  address: '',
  postal_code: '',
  city: '',
  latitude: '',
  longitude: '',
  telephone: '',
  distance: '',
  operatingHours: {},
  isOpen: ''
});

export const LocatorCoordinates = Immutable.Record({
  id: '',
  latitude: '',
  longitude: ''
});

export const UserGeoLocation = Immutable.Record({
  latitude: '',
  longitude: ''
});

export const ProductItem = Immutable.Record({
  id: '',
  is_dead: '',
  name: '',
  tags: '',
  is_discontinued: '',
  price_in_cents: '',
  regular_price_in_cents: '',
  limited_time_offer_savings_in_cents: '',
  limited_time_offer_ends_on: '',
  stock_type: '',
  primary_category: '',
  secondary_category: '',
  origin: '',
  package: '',
  package_unit_type: '',
  package_unit_volume_in_milliliters: '',
  total_package_units: '',
  volume_in_milliliters: '',
  alcohol_content: '',
  price_per_liter_of_alcohol_in_cents: '',
  price_per_liter_in_cents: '',
  inventory_count: '',
  sugar_content: '',
  producer_name: '',
  released_on: '',
  has_value_added_promotion: '',
  has_limited_time_offer: '',
  has_bonus_reward_miles: '',
  is_seasonal: '',
  is_vqa: '',
  is_ocb: '',
  is_kosher: '',
  value_added_promotion_description: '',
  description: '',
  serving_suggestion: '',
  tasting_note: '',
  updated_at: '',
  image_thumb_url: '',
  image_url: '',
  varietal: '',
  style: '',
  tertiary_category: '',
  sugar_in_grams_per_liter: '',
  clearance_sale_savings_in_cents: '',
  has_clearance_sale: '',
  product_no: ''
});
