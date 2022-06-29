/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CampaignMechanicDto {
  /** @example percentage-discount */
  type: "absolute-discount" | "percentage-discount";

  /**
   * The discount value for this promo.
   * @example 50
   */
  discountValue: number | number;

  /**
   * The maximum discount value for this promo in minor units (i.e. maximum discount of $5 would have a value of 500).
   *       Only applicable (and required) if the mechanic type is percentage-discount
   * @example 50
   */
  maxDiscountValue?: number;
}

export interface ImageUrlsDto {
  /**
   * URL to banner image that will be shown to users.
   * @example http://images.com/banner.jpg
   */
  banner: string;

  /**
   * URL to logo image that will be shown to users.
   * @example http://images.com/logo.jpg
   */
  logo: string;
}

export interface DisplayProgressBarsDto {
  claim: boolean;
  redemption: boolean;
}

export interface LimitDto {
  /**
   * @min 1
   * @max 10000
   */
  amount: number | null;
}

export interface SingleUserLimitDto {
  /**
   * @min 1
   * @max 50
   */
  amount: number;
}

export interface BillingInfoDto {
  /**
   * Percentage of this promo that is co-funded by the merchant. If the promo is fully funded by ShopBack, then this should be 0.
   * @format float
   * @min 0
   * @max 100
   * @example 10
   */
  cofundPercent: number;
}

export interface DisbursementDto {
  /** The way that users are able to claim promos for this campaign. Currently, we only support one disbursement method for a given campaign. */
  method: "claim-by-promo-code" | "system" | "direct-claim";
}

export interface UserRestrictionsDto {
  /** Key for the user segment that the user must belong to in order to use this promo. Only applicable if the restriction type is user-segment. */
  segmentKey?:
    | "sb-paylater:is-new-customer"
    | "sb-paylater:dormant-customer-60-days"
    | "sb-paylater:is-new-customer-to-merchant"
    | "sb-paylater:inactive-to-merchant-90-days";

  /** Parameters for the user segment that the user must belong to in order to use this promo. Only applicable if the chosen segment requires parameters. */
  segmentParams?: object;
  type: "user-segment";
}

export interface ItemRestrictionsDto {
  type: "merchants";

  /** The item's merchant type must match this merchantType before the promo can be applied. Applicable only if restriction type is merchants. */
  merchantType?: "sboc-eoutlet" | "sbgo-outlet" | "sbgo-brand" | "sbpaylater-merchant";

  /**
   * The item's merchant id must be included within these merchantIds before the promo can be applied. Applicable only if restriction type is merchants.
   * @example ["0000275","0000245"]
   */
  merchantIds?: string[];
}

export interface AggregatedItemsRestrictionDto {
  /**
   * Minimum spend amount in the purchase before the promo can be applied, which is expressed in minor units. Applicable only if restriction type is min-spend or min-spend-excluding-cashback.
   * @min 1
   * @example 400
   */
  minAmount?: number;

  /**
   * Payment method types that must be used in the purchase before the promo can be applied. Applicable only if restriction type is payment-method.
   * @example ["card"]
   */
  paymentMethodTypes?: "card" | "grabpay";

  /**
   * The payment card bin used in the purchase must start with one of the BINs within this range before the promo can be applied. Applicable only if restriction type is card-bin-range.
   * @example ["552523","552534"]
   */
  binRange?: string[];
  type: "min-spend" | "min-spend-excluding-cashback" | "payment-method" | "card-bin-range";
}

export interface RestrictionDto {
  user: UserRestrictionsDto[];
  item: ItemRestrictionsDto[];

  /** @example [{"type":"min-spend","minAmount":400},{"type":"payment-method","paymentMethodTypes":["card"]},{"type":"card-bin-range","binRange":["552523","552534"]}] */
  aggregatedItems: AggregatedItemsRestrictionDto[];
}

export interface CreateCampaignDto {
  mechanic: CampaignMechanicDto;

  /**
   * Name of the campaign. This will be shown to users.
   * @example $5 Off Min Spend $50
   */
  name: string;

  /**
   * Identifier which is used internally to search for the campaign. This will not be shown to users.
   * @example 5OFF50_2022_May
   */
  campaignCode: string;

  /**
   * Salesforce ID used to track revenue for partnerships. Can be omitted if not applicable.
   * @example a012x00000KXtr8AAD
   */
  salesforceId?: string;

  /**
   * Details of campaign which will be shown to users.
   * @example Get $5 off your next purchase
   */
  details?: string;

  /**
   * Terms and conditions for this campaign which will be shown to users.
   * @example <ul><li>This promo is for New Users only.</li><li>Applicable only for first 1000 redemptions only.</li></ul>
   */
  termsAndConditions: string;

  /**
   * Name of merchant where this promo can be applied. Will be shown to users.
   * @example Uniqlo
   */
  merchantName: string;

  /**
   * Name of partnership for this promo. Will be shown to users. Can be omitted if there is no partnership.
   * @example DBS Bank
   */
  partnershipName?: string;
  imageUrls: ImageUrlsDto;

  /**
   * Link where users will be redirected to when they want to apply the promo. Cannot be a branch.io link.
   * @example shopback://ecommerce/shoppingcart
   */
  redirectLink: string;

  /** Booleans indicating whether the progress bar for claims or redemptions should be shown on the UI. */
  displayProgressBars: DisplayProgressBarsDto;

  /** Boolean indicating whether users should be able to see this promo, regardless of whether they have claimed it. */
  isVisible: boolean;

  /**
   * Maximum number of claims that can be made for this campaign. If null, unlimited claims can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  claimLimit: LimitDto;

  /**
   * Maximum number of redemptions that can be made for this campaign. If null, unlimited redemptions can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  redemptionLimit: LimitDto;

  /**
   * Maximum number of redemptions that can be made by a single user for this campaign. Maximum allowed limit is 50.
   * @example {"amount":10}
   */
  singleUserRedemptionLimit: SingleUserLimitDto;
  billing: BillingInfoDto;
  disbursement: DisbursementDto[];

  /**
   * Promo code that is keyed in by users to claim the promo. Not to be confused with campaign code which is used to identify campaigns internally.
   *       Required if campaign disbursement method is claim-by-promo-code.
   * @example 5OFF50
   */
  promoCode?: string;
  restrictions: RestrictionDto;

  /** @example test@shopback.com */
  createdBy: string;
  businessUnits: ("sboc-vouchers" | "sbgo-vouchers" | "sbpay" | "sbpaylater")[];

  /** @format date-time */
  claimFrom: string;

  /** @format date-time */
  claimBy: string;

  /** @format date-time */
  redeemFrom: string;

  /** @format date-time */
  redeemBy: string;
}

export interface EligibilityInputUser {
  /** Whether to determine claim eligibility by user input. */
  shouldCheck?: boolean;
}

export interface PaymentMethod {
  /** @example card */
  type: "card" | "molpay" | "paymaya" | "gcash" | "grabpay";

  /**
   * BIN (Bank Identification Number) of the card being used for this purchase. Only required if payment method type is card.
   * @example 453252
   */
  bin?: string;
}

export interface EligibilityInputPayment {
  /** @min 0 */
  cashbackOffset: number;
  paymentMethod: PaymentMethod;
}

export interface Merchant {
  /** @example 0000123 */
  id: string;
  type: "sboc-eoutlet" | "sbgo-outlet" | "sbgo-brand" | "sbpaylater-merchant";
}

export interface ItemOptional {
  /**
   * Identifier for this particular item in the purchase.
   * @example item-one
   */
  id?: string;

  /**
   * Amount that user is paying for this item which is expressed in minor units (i.e. $1 should be sent as 100).
   * @example 1000
   */
  amount?: number;
  merchant?: Merchant;
  businessUnit?: "sboc-vouchers" | "sbgo-vouchers" | "sbpay" | "sbpaylater";
}

export interface EligibiltyInput {
  user?: EligibilityInputUser;

  /** If specified, this endpoint determines claim eligibility by payment input. */
  payment?: EligibilityInputPayment;

  /** Default eligibility returned in the event of missing inputs required by any restriction checker. */
  defaultIfInputMissing?: boolean;
  items?: ItemOptional[];
}

export interface CampaignEligibility {
  input?: EligibiltyInput;
}

export interface GetCampaignRequest {
  eligibility?: CampaignEligibility;

  /**
   * If specified, this endpoint transforms the response according to the specified transformer version; else no transformation is performed.
   * @min 0
   * @max 0
   */
  transformerVersion?: number;
}

export interface ApproximateStatistics {
  /** Total number of claims made for this campaign. */
  claims: number;

  /**
   * Percentage of claims made for this campaign over claimLimit.amount.
   * @format float
   */
  claimPercent: number;

  /** Total number of redemptions made for this campaign. */
  redemptions: number;

  /**
   * Percentage of redemptions made for this campaign over redemptionLimit.amount.
   * @format float
   */
  redemptionPercent: number;
}

export interface CampaignGetDto {
  /** @example 626bd3a7d3e750d2f31bd9cc */
  _id: string;
  mechanic: CampaignMechanicDto;

  /**
   * Name of the campaign. This will be shown to users.
   * @example $5 Off Min Spend $50
   */
  name: string;

  /**
   * Identifier which is used internally to search for the campaign. This will not be shown to users.
   * @example 5OFF50_2022_May
   */
  campaignCode: string;

  /**
   * Salesforce ID used to track revenue for partnerships. Can be omitted if not applicable.
   * @example a012x00000KXtr8AAD
   */
  salesforceId?: string;

  /**
   * Details of campaign which will be shown to users.
   * @example Get $5 off your next purchase
   */
  details?: string;

  /**
   * Terms and conditions for this campaign which will be shown to users.
   * @example <ul><li>This promo is for New Users only.</li><li>Applicable only for first 1000 redemptions only.</li></ul>
   */
  termsAndConditions: string;

  /**
   * Name of merchant where this promo can be applied. Will be shown to users.
   * @example Uniqlo
   */
  merchantName: string;

  /**
   * Name of partnership for this promo. Will be shown to users. Can be omitted if there is no partnership.
   * @example DBS Bank
   */
  partnershipName?: string;
  imageUrls: ImageUrlsDto;

  /**
   * Link where users will be redirected to when they want to apply the promo. Cannot be a branch.io link.
   * @example shopback://ecommerce/shoppingcart
   */
  redirectLink: string;

  /** Booleans indicating whether the progress bar for claims or redemptions should be shown on the UI. */
  displayProgressBars: DisplayProgressBarsDto;

  /** Boolean indicating whether users should be able to see this promo, regardless of whether they have claimed it. */
  isVisible: boolean;

  /**
   * Maximum number of claims that can be made for this campaign. If null, unlimited claims can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  claimLimit: LimitDto;

  /**
   * Maximum number of redemptions that can be made for this campaign. If null, unlimited redemptions can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  redemptionLimit: LimitDto;

  /**
   * Maximum number of redemptions that can be made by a single user for this campaign. Maximum allowed limit is 50.
   * @example {"amount":10}
   */
  singleUserRedemptionLimit: SingleUserLimitDto;
  billing: BillingInfoDto;
  disbursement: DisbursementDto[];

  /**
   * Promo code that is keyed in by users to claim the promo. Not to be confused with campaign code which is used to identify campaigns internally.
   *       Required if campaign disbursement method is claim-by-promo-code.
   * @example 5OFF50
   */
  promoCode?: string;
  restrictions: RestrictionDto;

  /** @example test@shopback.com */
  createdBy: string;
  isEligible: boolean;
  businessUnits: ("sboc-vouchers" | "sbgo-vouchers" | "sbpay" | "sbpaylater")[];

  /** @format date-time */
  claimFrom: string;

  /** @format date-time */
  claimBy: string;

  /** @format date-time */
  redeemFrom: string;

  /** @format date-time */
  redeemBy: string;
  approximateStatistics: ApproximateStatistics;
}

export interface ClaimWithoutCampaign {
  /** @example 626bd3a7d3e750d2f31bd9cc */
  _id: string;

  /** @example 626bd3a7d3e750d2f31bd9cc */
  campaignId: string;

  /** Remaining number of redemptions that can be made for this claim. Maximum allowed limit is 50. */
  redemptionsRemaining: number;

  /** Number of redemption refunds made for this claim. */
  refundCount: number;
  accountId?: number;
  redemptionAttempts: string[];
  promoCode?: string;

  /** @format date-time */
  claimedAt?: string;
}

export interface RedeemedAtCountDto {
  /**
   * Number of redemptions made for this claim on this date. Maximum allowed limit is 50.
   * @min 1
   * @max 50
   */
  count: number;

  /** @format date-time */
  date: string;
}

export interface Display {
  /** @example 20% Off Purchases */
  title: string;
  subtitleOne: string[];
  subtitleTwo: string[];
  redeemedAtCounts: RedeemedAtCountDto[];
}

export interface CampaignTransformedV0Dto {
  /** @example 626bd3a7d3e750d2f31bd9cc */
  _id: string;

  /**
   * Name of the campaign. This will be shown to users.
   * @example $5 Off Min Spend $50
   */
  name: string;

  /**
   * Terms and conditions for this campaign which will be shown to users.
   * @example <ul><li>This promo is for New Users only.</li><li>Applicable only for first 1000 redemptions only.</li></ul>
   */
  termsAndConditions: string;
  mechanic: CampaignMechanicDto;

  /**
   * Name of merchant where this promo can be applied. Will be shown to users.
   * @example Uniqlo
   */
  merchantName: string;

  /**
   * Link where users will be redirected to when they want to apply the promo. Cannot be a branch.io link.
   * @example shopback://ecommerce/shoppingcart
   */
  redirectLink: string;

  /** Booleans indicating if the progress bars for claim or redemption should be shown */
  displayProgressBars: DisplayProgressBarsDto;

  /**
   * Name of partnership for this promo. Will be shown to users. Can be omitted if there is no partnership.
   * @example DBS Bank
   */
  partnershipName?: string;

  /**
   * Details of campaigns which will be shown to users.
   * @example Get $5 off your next purchase
   */
  details?: string;
  claim?: ClaimWithoutCampaign;
  display: Display;
  imageUrls: ImageUrlsDto;

  /** @format date-time */
  redeemFrom: string;

  /** @format date-time */
  redeemBy: string;
  approximateStatistics: ApproximateStatistics;
  isEligible: boolean;
}

export interface GetCampaignResponseData {
  campaign: CampaignTransformedV0Dto | CampaignGetDto;
}

export interface GetCampaignResponse {
  data: GetCampaignResponseData;
}

export interface CampaignDto {
  /** @example 626bd3a7d3e750d2f31bd9cc */
  _id: string;
  mechanic: CampaignMechanicDto;

  /**
   * Name of the campaign. This will be shown to users.
   * @example $5 Off Min Spend $50
   */
  name: string;

  /**
   * Identifier which is used internally to search for the campaign. This will not be shown to users.
   * @example 5OFF50_2022_May
   */
  campaignCode: string;

  /**
   * Salesforce ID used to track revenue for partnerships. Can be omitted if not applicable.
   * @example a012x00000KXtr8AAD
   */
  salesforceId?: string;

  /**
   * Details of campaign which will be shown to users.
   * @example Get $5 off your next purchase
   */
  details?: string;

  /**
   * Terms and conditions for this campaign which will be shown to users.
   * @example <ul><li>This promo is for New Users only.</li><li>Applicable only for first 1000 redemptions only.</li></ul>
   */
  termsAndConditions: string;

  /**
   * Name of merchant where this promo can be applied. Will be shown to users.
   * @example Uniqlo
   */
  merchantName: string;

  /**
   * Name of partnership for this promo. Will be shown to users. Can be omitted if there is no partnership.
   * @example DBS Bank
   */
  partnershipName?: string;
  imageUrls: ImageUrlsDto;

  /**
   * Link where users will be redirected to when they want to apply the promo. Cannot be a branch.io link.
   * @example shopback://ecommerce/shoppingcart
   */
  redirectLink: string;

  /** Booleans indicating whether the progress bar for claims or redemptions should be shown on the UI. */
  displayProgressBars: DisplayProgressBarsDto;

  /** Boolean indicating whether users should be able to see this promo, regardless of whether they have claimed it. */
  isVisible: boolean;

  /**
   * Maximum number of claims that can be made for this campaign. If null, unlimited claims can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  claimLimit: LimitDto;

  /**
   * Maximum number of redemptions that can be made for this campaign. If null, unlimited redemptions can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  redemptionLimit: LimitDto;

  /**
   * Maximum number of redemptions that can be made by a single user for this campaign. Maximum allowed limit is 50.
   * @example {"amount":10}
   */
  singleUserRedemptionLimit: SingleUserLimitDto;
  billing: BillingInfoDto;
  disbursement: DisbursementDto[];

  /**
   * Promo code that is keyed in by users to claim the promo. Not to be confused with campaign code which is used to identify campaigns internally.
   *       Required if campaign disbursement method is claim-by-promo-code.
   * @example 5OFF50
   */
  promoCode?: string;
  restrictions: RestrictionDto;

  /** @example test@shopback.com */
  createdBy: string;
  businessUnits: ("sboc-vouchers" | "sbgo-vouchers" | "sbpay" | "sbpaylater")[];

  /** @format date-time */
  claimFrom: string;

  /** @format date-time */
  claimBy: string;

  /** @format date-time */
  redeemFrom: string;

  /** @format date-time */
  redeemBy: string;
  approximateStatistics: ApproximateStatistics;
}

export interface CampaignSearchResponseData {
  /** Total number of campaigns */
  count?: number;
  campaigns: CampaignDto[];
}

export interface CampaignSearchResponse {
  data: CampaignSearchResponseData;
}

export interface CampaignUpdateRequest {
  /**
   * Name of the campaign. This will be shown to users.
   * @example $5 Off Min Spend $50
   */
  name?: string;

  /**
   * Terms and conditions for this campaign which will be shown to users.
   * @example <ul><li>This promo is for New Users only.</li><li>Applicable only for first 1000 redemptions only.</li></ul>
   */
  termsAndConditions?: string;

  /**
   * Name of merchant where this promo can be applied. Will be shown to users.
   * @example Uniqlo
   */
  merchantName?: string;

  /**
   * Link where users will be redirected to when they want to apply the promo. Cannot be a branch.io link.
   * @example shopback://ecommerce/shoppingcart
   */
  redirectLink?: string;

  /** Booleans indicating if the progress bars for claim or redemption should be shown */
  displayProgressBars?: DisplayProgressBarsDto;

  /**
   * Details of campaigns which will be shown to users.
   * @example Get $5 off your next purchase
   */
  details?: string;

  /**
   * Maximum number of redemptions that can be made for this campaign. If null, unlimited redemptions can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  redemptionLimit?: LimitDto;

  /**
   * Maximum number of claims that can be made for this campaign. If null, unlimited claims can be made. If not null, the max limit is 10000.
   * @example {"amount":100}
   */
  claimLimit?: LimitDto;

  /**
   * Salesforce ID used to track revenue for partnerships. Can be omitted if not applicable.
   * @example a012x00000KXtr8AAD
   */
  salesforceId?: string;

  /** Boolean indicating whether users should be able to see this promo, regardless of whether they have claimed it. */
  isVisible?: boolean;

  /** Email of change maker */
  updatedBy: string;
  imageUrls?: ImageUrlsDto;
}

export interface ItemInfo {
  /**
   * Identifier for this particular item in the purchase. Used to match the item to the discountedItems property in the response.
   * @example item-one
   */
  id: string;

  /**
   * Amount that user is paying for this item which is expressed in minor units (i.e. $1 should be sent as 100).
   * @example 1000
   */
  amount: number;
  merchant: Merchant;
  businessUnit: "sboc-vouchers" | "sbgo-vouchers" | "sbpay" | "sbpaylater";
}

export interface GetSuggestedClaimRequest {
  /** @example 5647354 */
  accountId: number;

  /**
   * The amount of cashback that is used for this purchase in minor units (i.e. $1 should be sent as 100).
   * @min 0
   */
  cashbackOffset: number;

  /** Information about the non-cashback payment method being used for this purchase. Can be null or excluded if the purchase is made purely via cashback. */
  paymentMethod: PaymentMethod;

  /** Information about the items being purchased by the user. */
  items: ItemInfo[];
}

export interface CampaignForSugggestedClaim {
  /**
   * Name of the promo campaign for this claim. To be used for display purposes.
   * @example $5 Off Your First Purchase
   */
  name: string;
}

export interface SuggestedClaim {
  /**
   * ID of the suggested claim.
   * @example 626bd3a7d3e750d2f31bd9cc
   */
  _id: string;
  campaign: CampaignForSugggestedClaim;
}

export interface DiscountedItem {
  /**
   * Identifier for this particular item in the purchase. Will be equal to the item id that was sent in the request.
   * @example item-one
   */
  id: string;

  /**
   * Discounted amount that the user should pay for this item after the promo is applied, in minor units (i.e. $1 will be sent as 100).
   * @example 500
   */
  amount: number;
}

export interface GetSuggestedClaimResponseData {
  /** Best claim to be used for this purchase. Will be null if user has no eligible claims. */
  claim: SuggestedClaim | null;
  discountedItems: DiscountedItem[];
}

export interface GetSuggestedClaimResponse {
  data: GetSuggestedClaimResponseData;
}

export interface RedeemFromRange {
  /**
   * Filter on date that campaign.redeemFrom is greater than
   * @format date-time
   */
  gt?: string;

  /**
   * Filter on date that campaign.redeemFrom is less than
   * @format date-time
   */
  lt?: string;
}

export interface RedeemByRange {
  /**
   * Filter on date that campaign.redeemBy is greater than
   * @format date-time
   */
  gt?: string;

  /**
   * Filter on date that campaign.redeemBy is less than
   * @format date-time
   */
  lt?: string;
}

export interface RedemptionPercentRange {
  /**
   * Filter on percentage that campaign.approximateStatistics.redemptionPercent is greater than
   * @format float
   * @min 0
   */
  gt?: number;

  /**
   * Filter on percentage that campaign.approximateStatistics.redemptionPercent is less than
   * @format float
   * @max 100
   */
  lt?: number;
}

export interface CampaignFilters {
  /** Filter on campaign.businessUnits */
  businessUnits?: ("sboc-vouchers" | "sbgo-vouchers" | "sbpay" | "sbpaylater")[];

  /** Filter on campaign.isVisible */
  isVisible?: boolean;
  redeemFrom?: RedeemFromRange;
  redeemBy?: RedeemByRange;
  redemptionPercent?: RedemptionPercentRange;
}

export interface RedemptionsRemainingRange {
  /** Filter on number that redemptionsRemaining is greater than */
  gt?: number;

  /** Filter on number that redemptionsRemaining is less than */
  lt?: number;
}

export interface Filters {
  /**
   * Filter on accountId
   * @example 123456
   */
  accountId?: number;

  /**
   * Filter on campaignIds
   * @example 626bd969d3e750d2f31bdeab
   */
  campaignIds?: string;
  campaign?: CampaignFilters;
  redemptionsRemaining?: RedemptionsRemainingRange;
}

export interface ClaimEligibility {
  input?: EligibiltyInput;

  /** If specified, this endpoint returns those claims ineligible for any of the specified campaign restriction categories; else it returns the eligible claims. */
  failedRestrictionCategories?: ("user" | "item" | "aggregatedItems")[];
}

export interface Next {
  /**
   * Last claim id in previous paginated response
   * @example 626bd969d3e750d2f31bdeab
   */
  id: string;

  /**
   * One of claimedAt, redeemFrom, redeemBy of last claim in previous paginated response, depending on sort.by
   * @format date-time
   */
  date?: string;
}

export interface Sort {
  by: "claimedAt" | "redeemFrom" | "redeemBy";
  order: "asc" | "desc";
}

export interface SearchRequest {
  filters?: Filters;
  eligibility?: ClaimEligibility;

  /**
   * Limit of number of claims to be returned.
   * @min 1
   * @max 25
   */
  limit?: number;

  /**
   * If specified, this endpoint transforms the response according to the specified transformer version; else no transformation is performed.
   * @min 0
   * @max 0
   */
  transformerVersion?: number;
  next?: Next;
  sort?: Sort;
}

export interface CampaignNested {
  /** @example 626bd3a7d3e750d2f31bd9cc */
  _id: string;

  /**
   * Terms and conditions for this campaign which will be shown to users.
   * @example <ul><li>This promo is for New Users only.</li><li>Applicable only for first 1000 redemptions only.</li></ul>
   */
  termsAndConditions: string;
  mechanic: CampaignMechanicDto;

  /**
   * Name of merchant where this promo can be applied. Will be shown to users.
   * @example Uniqlo
   */
  merchantName: string;

  /**
   * Link where users will be redirected to when they want to apply the promo. Cannot be a branch.io link.
   * @example shopback://ecommerce/shoppingcart
   */
  redirectLink: string;

  /** Booleans indicating whether the progress bar for claims or redemptions should be shown on the UI. */
  displayProgressBars: DisplayProgressBarsDto;

  /**
   * Name of partnership for this promo. Will be shown to users. Can be omitted if there is no partnership.
   * @example DBS Bank
   */
  partnershipName?: string;

  /**
   * Details of campaign which will be shown to users.
   * @example Get $5 off your next purchase
   */
  details?: string;
  name: string;
  imageUrls: ImageUrlsDto;

  /** @format date-time */
  redeemFrom: string;

  /** @format date-time */
  redeemBy: string;
  approximateStatistics: ApproximateStatistics;
}

export interface ClaimTransformedV0Dto {
  /** @example 626bd3a7d3e750d2f31bd9cc */
  _id: string;

  /** @example 626bd3a7d3e750d2f31bd9cc */
  campaignId: string;

  /** Remaining number of redemptions that can be made for this claim. Maximum allowed limit is 50. */
  redemptionsRemaining: number;

  /** Number of redemption refunds made for this claim. */
  refundCount: number;
  accountId?: number;
  redemptionAttempts: string[];
  promoCode?: string;

  /** @format date-time */
  claimedAt?: string;
  campaign: CampaignNested;
  display: Display;
}

export interface SearchResponseData {
  claims: ClaimTransformedV0Dto[] | ClaimWithoutCampaign[];
  next?: Next;
}

export interface SearchResponse {
  data: SearchResponseData;
}

export interface ClaimRequest {
  /** Claim type. */
  claimType: "campaignId" | "promoCode";

  /** Id of the campaign to be claimed by the user. Required if claim type is campaignId. */
  campaignId?: string;

  /** Promocode entered by user. Required if claim type is promoCode. */
  promoCode?: string;
}

export interface ClaimResponseData {
  /** @example Get $5 Off Your First PayLater Purchase */
  campaignName: string;
  claim: ClaimWithoutCampaign;
}

export interface ClaimResponse {
  data: ClaimResponseData;
}

export interface RedemptionRequestBody {
  /**
   * ID of claim being redeemed
   * @example 6278eb560ab3436d3dc6d8bd
   */
  claimId: string;

  /**
   * Whether or not to actually perform the redemption process. If false, eligibility and discounts are computed and returned, but the redemption is not performed.
   *       This behavior for commit: false can be used for display of the discounted amount or for validating eligibility before the purchase is made
   */
  commit: boolean;

  /**
   * accountId of user making the claim
   * @example 4352694
   */
  accountId: number;

  /**
   * Reference which uniquely identifies the user's purchase. Required if commit is true
   * @example RBM28I-U02-4
   */
  reference?: string;

  /**
   * The amount of cashback that is used for this purchase in minor units (i.e. $1 should be sent as 100)
   * @min 0
   */
  cashbackOffset: number;

  /** Information about the non-cashback payment method that is being used for this purchase. For orders made entirely by cashback, this can be null. */
  paymentMethod?: PaymentMethod | null;

  /** Information about the items being purchased by the user. Used for eligibility calculation. */
  items: ItemInfo[];
}

export interface RedemptionResponseData {
  /** @example Get $5 Off Your First PayLater Purchase */
  campaignName: string;
  discountedItems: DiscountedItem[];
}

export interface RedemptionResponse {
  data: RedemptionResponseData;
}

export interface RedemptionStatusUpdateRequest {
  /** Type of identifier that is being used to perform the status update. For now, only clientReference will be supported. */
  identifierType: "clientReference";

  /**
   * Reference for this redemption that was set during the previous call to POST /promo/redemptions
   * @example R7GTE6-WR6G-U
   */
  clientReference: string;

  /** New status for this redemption */
  status: "available" | "redeemed" | "refunded";
}

export interface RecalculateDiscountRequest {
  /** Type of identifier that is being used to perform the status update. For now, only clientReference will be supported. */
  identifierType: "clientReference";

  /**
   * Reference for this redemption that was set during the previous call to POST /promo/redemptions
   * @example R7GTE6-WR6G-U
   */
  clientReference: string;

  /** Information about the remaining items in the order after partial refund was performed. */
  items: ItemInfo[];

  /**
   * The amount of cashback that is used for this purchase in minor units (i.e. $1 should be sent as 100)
   * @min 0
   */
  cashbackOffset: number;
}

export interface RecalculateDiscountData {
  discountedItems: DiscountedItem[];
}

export interface RecalculateDiscountResponse {
  data: RecalculateDiscountData;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:9000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title promo-platform
 * @version 0.1
 * @baseUrl http://localhost:9000
 * @contact
 *
 * promo-platform-service
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  promo = {
    /**
     * @description This API is typically only called from Needle
     *
     * @name CampaignsControllerCreateCampaign
     * @summary Create a new promo campaign
     * @request POST:/promo/campaigns
     */
    campaignsControllerCreateCampaign: (data: CreateCampaignDto, params: RequestParams = {}) =>
      this.request<
        void,
        { error?: { statusCode: 400; code: string; title: string; message: string; reqId?: string } } | void
      >({
        path: `/promo/campaigns`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CampaignsControllerGetCampaign
     * @summary Get information about a single campaign
     * @request POST:/promo/campaigns/{id}/details
     */
    campaignsControllerGetCampaign: (id: string, data: GetCampaignRequest, params: RequestParams = {}) =>
      this.request<
        GetCampaignResponse,
        | { error?: { statusCode: 400; code: string; title: string; message: string; reqId?: string } }
        | void
        | { error?: { statusCode: 404; code: string; title: string; message: string; reqId?: string } }
      >({
        path: `/promo/campaigns/${id}/details`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This API is typically only called from Needle
     *
     * @name CampaignsControllerSearchCampaigns
     * @summary Search for Campaign
     * @request GET:/promo/campaigns/search
     */
    campaignsControllerSearchCampaigns: (
      query: { limit: number; doCount?: boolean; lastId?: string },
      params: RequestParams = {},
    ) =>
      this.request<CampaignSearchResponse, void>({
        path: `/promo/campaigns/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This API is typically only called from Needle to update a campaign
     *
     * @name CampaignsControllerUpdateCampaign
     * @summary Update Campaign
     * @request PUT:/promo/campaigns/{id}
     */
    campaignsControllerUpdateCampaign: (id: string, data: CampaignUpdateRequest, params: RequestParams = {}) =>
      this.request<
        void,
        { error?: { statusCode: 400; code: string; title: string; message: string; reqId?: string } } | void
      >({
        path: `/promo/campaigns/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ClaimsControllerGetSuggested
     * @summary Get best promo for a given purchase
     * @request POST:/promo/claims/suggested
     */
    claimsControllerGetSuggested: (data: GetSuggestedClaimRequest, params: RequestParams = {}) =>
      this.request<GetSuggestedClaimResponse, void>({
        path: `/promo/claims/suggested`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClaimsControllerSearch
     * @summary Search for claims
     * @request POST:/promo/claims/search
     */
    claimsControllerSearch: (data: SearchRequest, params: RequestParams = {}) =>
      this.request<
        SearchResponse,
        { error?: { statusCode: 400; code: string; title: string; message: string; reqId?: string } } | void
      >({
        path: `/promo/claims/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ClaimsControllerClaim
     * @summary Claim by campaignId or promo code
     * @request POST:/promo/claims
     */
    claimsControllerClaim: (data: ClaimRequest, params: RequestParams = {}) =>
      this.request<
        ClaimResponse,
        | void
        | { error?: { statusCode: 404; code: string; title: string; message: string; reqId?: string } }
        | {
            error?: {
              statusCode: 422;
              code:
                | "PROMO_CLAIM_LIMIT_REACHED"
                | "PROMO_INVALID_PROMO_CODE"
                | "PROMO_CLAIM_PERIOD_ENDED"
                | "PROMO_CLAIM_PERIOD_NOT_STARTED"
                | "PROMO_CAMPAIGN_ALREADY_CLAIMED"
                | "PROMO_USER_ELIGIBILITY_FAILED";
              title: string;
              message: string;
              reqId?: string;
            };
          }
      >({
        path: `/promo/claims`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description To be called by backend services and not directly by customers. This API is idempotent and can be safely retried in the event of timeouts or other unexpected errors
     *
     * @name RedemptionsControllerPerformRedemption
     * @summary Perform a redemption of a claimed promo
     * @request POST:/promo/redemptions
     */
    redemptionsControllerPerformRedemption: (data: RedemptionRequestBody, params: RequestParams = {}) =>
      this.request<
        RedemptionResponse,
        | void
        | { error?: { statusCode: 404; code: string; title: string; message: string; reqId?: string } }
        | { error?: { statusCode: 409; code: string; title: string; message: string; reqId?: string } }
        | {
            error?: {
              statusCode: 422;
              code:
                | "PROMO_NO_REDEMPTIONS_REMANING_FOR_CLAIM"
                | "PROMO_REDEMPTION_LIMIT_REACHED"
                | "PROMO_REDEMPTION_PERIOD_ENDED"
                | "PROMO_REDEMPTION_PERIOD_NOT_STARTED"
                | "PROMO_NOT_VISIBLE"
                | "PROMO_USER_ELIGIBILITY_FAILED"
                | "PROMO_BUSINESS_UNIT_ELIGIBILITY_FAILED"
                | "PROMO_MERCHANT_ELIGIBILITY_FAILED"
                | "PROMO_MIN_SPEND_NOT_REACHED"
                | "PROMO_PAYMENT_METHOD_NOT_ELIGIBLE";
              title: string;
              message: string;
              reqId?: string;
            };
          }
      >({
        path: `/promo/redemptions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description To be called by backend services upon confirmation or failure of purchase, or upon refund
     *
     * @name RedemptionsControllerUpdateRedemptionStatus
     * @summary Update redemption status
     * @request PUT:/promo/redemptions
     */
    redemptionsControllerUpdateRedemptionStatus: (data: RedemptionStatusUpdateRequest, params: RequestParams = {}) =>
      this.request<
        void,
        | void
        | { error?: { statusCode: 404; code: string; title: string; message: string; reqId?: string } }
        | { error?: { statusCode: 409; code: string; title: string; message: string; reqId?: string } }
        | { error?: { statusCode: 422; code: string; title: string; message: string; reqId?: string } }
      >({
        path: `/promo/redemptions`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description To be called by backend services upon partial refund
     *
     * @name RedemptionsControllerRecalculateDiscount
     * @summary Recalculate discount amount for redemption in case of partial refund
     * @request POST:/promo/redemptions/recalculate
     */
    redemptionsControllerRecalculateDiscount: (data: RecalculateDiscountRequest, params: RequestParams = {}) =>
      this.request<
        RecalculateDiscountResponse,
        | void
        | { error?: { statusCode: 404; code: string; title: string; message: string; reqId?: string } }
        | { error?: { statusCode: 422; code: string; title: string; message: string; reqId?: string } }
      >({
        path: `/promo/redemptions/recalculate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
