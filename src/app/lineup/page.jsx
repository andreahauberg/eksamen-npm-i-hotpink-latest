import { fetchAPI, fetchDatabase } from "../../app/api/api.js";
import { useState, useEffect } from "react";

export default function Lineup() {
  useEffect(() => {
    const loadLineUp = async () => {
      try {
        const data = await fetchAPI("/available-spots");
        setCampingAreas(data);
      } catch (error) {
        console.error("Error loading camping areas:", error);
      }
    };
    loadCampingAreas();
  }, []);

  return (
    <>
      <section>
        <h1>HEJ</h1>
      </section>
    </>
  );
}
