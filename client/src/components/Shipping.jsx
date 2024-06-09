import React from "react";

const Shipping = () => {
  return (
    <div>
      <h3 className=" text-xl font-medium">Shipping Policy</h3>

      <h2 className=" text-lg mt-3 text-[14px]">Shipping Options and Costs</h2>
      <div className=" mt-2">We offer the following shipping options:</div>
      <div className=" text-base mt-2">
        Standard Shipping: Delivery within 5-7 business days. Cost: $5.00 or
        FREE on orders over $50. Express Shipping: Delivery within 2-3 business
        days. Cost: $15.00. Overnight Shipping: Delivery within 1 business day.
        Cost: $25.00. Processing Time Orders are processed and shipped within
        1-2 business days of purchase. Orders placed on weekends or holidays
        will be processed the next business day.
      </div>

      <ul className="mt-3 pl-7" style={{ listStyle: "disc" }}>
        <li>
          <div className=" font-semibold"> International Shipping</div>
          <div className=" text-base mt-2">
            We currently offer international shipping to select countries.
            Shipping costs and delivery times vary by destination. Please see
            the checkout page for shipping options and rates for your specific
            country.
          </div>
        </li>
        <li className=" mt-2">
          <div className=" font-semibold"> Tracking Your Order</div>

          <div className=" text-base mt-2">
            Once your order has been shipped, you will receive a shipping
            confirmation email with a tracking number. You can track your order
            through our website or the carrier’s website.
          </div>
        </li>
        <li>
          <div className=" font-semibold"> Lost or Damaged Packages</div>

          <div className=" text-base mt-2">
            If your package is lost or arrives damaged, please contact our
            customer service team within 7 days of the expected delivery date.
            We will work with the carrier to resolve the issue as quickly as
            possible.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Shipping;
