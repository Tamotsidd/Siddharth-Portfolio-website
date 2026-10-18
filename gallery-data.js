(() => {
  const galleries = {
    culture: {
      type: "photo",
      label: "CULTURE",
      folder: "assets/images/photography/culture",
      files: [
        "INFI7751.jpg", "1753786902832.jpg", "1764858444195.jpg",
        "1764858444645.jpg", "1764858444747.jpg", "DSC_3688.jpg",
        "DSC09408.jpg", "DSC09410.jpg", "DSC09412.jpg", "DSC09413.jpg",
        "INFI7756.jpg", "INFI7800.jpg", "INFI7801.jpg",
        "Picsart_25-07-30_12-21-00-106.jpg",
        "Picsart_25-08-18_19-39-04-542.jpg",
        "Picsart_25-08-19_07-59-48-812.png"
      ]
    },
    events: {
      type: "photo",
      label: "EVENTS",
      folder: "assets/images/photography/events",
      files: [
        "1742700709612.jpg", "1741952854323.jpg", "1742022315441 (1).jpg",
        "1742655081976 (1).jpg", "1742655082082 (1).jpg",
        "1742700709483 (1).jpg", "1742746820906.jpg",
        "1742777972162.jpg", "DSC05607.jpg", "DSC05610.jpg",
        "f13315008.jpg", "f13315232.jpg"
      ]
    },
    nature: {
      type: "photo",
      label: "NATURE",
      folder: "assets/images/photography/nature",
      files: ["DSC01251.jpg"]
    },
    portraits: {
      type: "photo",
      label: "PORTRAITS",
      folder: "assets/images/photography/portraits",
      files: [
        "1000012255.jpg", "1742655081861 (1).jpg", "1742660300398.jpg",
        "1742700709535.jpg", "1742775952228.jpg", "1742776410511.JPG",
        "DSC_0141.jpg", "DSC_9048.jpg", "DSC_9156.jpg", "DSC_9260.jpg",
        "DSC_9318.jpg", "DSC_9332.jpg", "DSC_9350.jpg", "DSC_9551.jpg",
        "DSC_9553.jpg", "DSC00052.jpg", "DSC01205.jpg", "DSC03434.jpg",
        "DSC03520.jpg", "DSC03622.jpg", "DSC03630.jpg", "DSC03635.jpg",
        "DSC03725.jpg", "DSC03752.jpg", "DSC03758.jpg", "DSC05362.jpg",
        "DSC05372.jpg", "DSC05483.jpg", "DSC05502.jpg", "f10462272.png",
        "f10752224.jpg", "f39014080.jpg", "IMG_1276.jpg"
      ]
    },
    street: {
      type: "photo",
      label: "STREET",
      folder: "assets/images/photography/street",
      files: [
        "_DSC0012_Original.jpg", "1742655081902.jpg", "1742660300343.jpg",
        "DSC_8067_Original.jpg", "DSC03515.jpg", "DSC03559.jpg",
        "DSC03575.jpg", "DSC03592.jpg", "DSC03610.jpg",
        "DSC03678-HDR.jpg", "DSC03693.jpg", "DSC03704.jpg",
        "DSC03710.jpg", "IMG_20250518_145841.jpg", "IMG_20250518_145854.jpg"
      ]
    },
    weddings: {
      type: "photo",
      label: "WEDDINGS",
      folder: "assets/images/photography/weddings",
      files: [
        "DSC_2054.jpg", "1764598425293.jpg", "1764598425334.jpg",
        "1764598425363.jpg", "20250226_170714.jpg", "DSC_1762.jpg",
        "DSC_1964.jpg", "DSC_1977.JPG", "DSC_7990.jpg", "DSC_8702.jpg",
        "DSC_8751.jpg", "DSC04132.jpg", "DSC04145.jpg", "DSC04179.jpg",
        "DSC04239.jpg", "f13315520.jpg", "f13331904.jpg", "MIS08768.jpg",
        "MIS08785.jpg", "MIS08925.jpg"
      ]
    },
    designs: {
      type: "design",
      label: "DESIGN",
      folder: "assets/images/design",
      files: [
        "f13316480.png", "Gantabya.jpg",
        "Picsart_25-11-16_10-25-51-852_Original.PNG",
        "Project (20231126105013)_Original.jpg",
        "The Rusneiz poster (3)_Original.jpg"
      ]
    }
  };

  document.querySelectorAll("[data-gallery]").forEach(gallery => {
    const data = galleries[gallery.dataset.gallery];
    if (!data) {
      console.error(`Unknown gallery: ${gallery.dataset.gallery}`);
      return;
    }

    const files = data.files.map(file =>
      `${data.folder}/${file.replace(/\.[^.]+$/, ".webp")}`
    );
    files.forEach((src, index) => {
      const itemNumber = String(index + 1).padStart(2, "0");
      const figure = document.createElement("figure");
      figure.className = `${data.type === "design" ? "design-card" : "photo-card"} reveal`;

      const image = document.createElement("img");
      image.src = src;
      image.alt = `${data.type === "design" ? "design artwork" : `${data.label.toLowerCase()} photograph`} ${itemNumber}`;
      image.loading = "lazy";
      image.decoding = "async";
      figure.setAttribute("role", "button");
      figure.tabIndex = 0;
      figure.setAttribute("aria-label", `Open ${image.alt} at full resolution`);
      figure.append(image);

      const caption = document.createElement("figcaption");
      const category = document.createElement("span");
      category.textContent = data.label;
      caption.append(category);
      figure.append(caption);
      gallery.append(figure);
    });
  });
})();
