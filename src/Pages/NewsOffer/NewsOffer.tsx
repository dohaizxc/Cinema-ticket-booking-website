import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { StarIcon, TicketIcon, GiftIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";

import sliver from "../../assets/sliver.png";
import gold from "../../assets/gold.png";
import diamond from "../../assets/diamond.png";
import { Tabs } from "../../components/Tabs";
import { Membership } from "../../components/Membership";

export const NewsOffer = () => {
  
  const [selectedTab, setSelectedTab] = useState<boolean>(true);

  return (
    <Layout>
      <Tabs setSelectedTab={setSelectedTab} tab1="TIN MỚI" tab2="ƯU ĐÃI"></Tabs>
    </Layout>
  );
};
