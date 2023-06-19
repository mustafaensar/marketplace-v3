import { useContract, useNFTs } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Buy.module.css";

export default function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  const [selectedFilters, setSelectedFilters] = useState({
    "Backgrounds": "",
    "Left Eye": "",
    "Right Eye": "",
    "Mouth": ""
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const filterNFTs = (nft: any) => {
    const { attributes } = nft.metadata;
    return (
      (!selectedFilters["Backgrounds"] || attributes.find((attr: any) => attr.trait_type === "Backgrounds" && attr.value === selectedFilters.Backgrounds)) &&
      (!selectedFilters["Left Eye"] || attributes.find((attr: any) => attr.trait_type === "Left Eye" && attr.value === selectedFilters["Left Eye"])) &&
      (!selectedFilters["Right Eye"] || attributes.find((attr: any) => attr.trait_type === "Right Eye" && attr.value === selectedFilters["Right Eye"])) &&
      (!selectedFilters["Mouth"] || attributes.find((attr: any) => attr.trait_type === "Mouth" && attr.value === selectedFilters.Mouth))
    );
  };

  const filteredData = data?.filter(filterNFTs);

  return (
    <Container maxWidth="lg">
      <div>
        <h1>Buy NFTs</h1>
        <p>Browse which NFTs are available from the collection.</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filter}>
          <label htmlFor="backgroundFilter">Background</label>
          <select
            id="backgroundFilter"
            value={selectedFilters["Backgrounds"]}
            onChange={(e) =>
              handleFilterChange("Backgrounds", e.target.value)
            }
            className={styles.select}
          >
            <option value="">All</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Pink">Pink</option>
            <option value="Purple">Purple</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="leftEyeFilter">Left Eye</label>
          <select
            id="leftEyeFilter"
            value={selectedFilters["Left Eye"]}
            onChange={(e) => handleFilterChange("Left Eye", e.target.value)}
            className={styles.select}
          >
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="Partial Bottom">Partial Bottom</option>
            <option value="Partial Top">Partial Top</option>
            <option value="Skew Gold">Skew Gold</option>
            <option value="Skew">Skew</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="rightEyeFilter">Right Eye</label>
          <select
            id="rightEyeFilter"
            value={selectedFilters["Right Eye"]}
            onChange={(e) => handleFilterChange("Right Eye", e.target.value)}
            className={styles.select}
          >
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="Partial Bottom">Partial Bottom</option>
            <option value="Partial Top">Partial Top</option>
            <option value="Skew Gold">Skew Gold</option>
            <option value="Skew">Skew</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="mouthFilter">Mouth</label>
          <select
            id="mouthFilter"
            value={selectedFilters["Mouth"]}
            onChange={(e) => handleFilterChange("Mouth", e.target.value)}
            className={styles.select}
          >
            <option value="">All</option>
            <option value="Sad">Sad</option>
            <option value="Smile">Smile</option>
            <option value="Smile Huge">Smile Huge</option>
            <option value="Smile Skew">Smile Skew</option>
            <option value="Smile Skew Huge">Smile Skew Huge</option>
            <option value="Smile Skew Huge Gold">Smile Skew Huge Gold</option>
          </select>
        </div>
      </div>

      <NFTGrid
        data={filteredData}
        isLoading={isLoading}
        emptyText="Looks like there are no NFTs matching the selected filters."
      />
    </Container>
  );
}
