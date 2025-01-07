class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];
  
    defaultConfig = {
      cardContainerClass: "card my-3",
      cardBodyClass: "card-body",
      imageClass: "card-img-top",
      titleClass: "card-title",
      subTitleClass: "card-subtitle my-3",
      textClass: "card-text",
      buttonClass: "btn btn-warning",
    };
  
    defaultData = {
      title: "Sample Card Title",
      subTitle: "Sample Card Sub Title",
      description: "This is a sample description for the card component.",
      image: "https://via.placeholder.com/150",
      imageStyles: {}, // Default empty styles
      button: "Click Me!",
      showImage: true,
      showTitle: true,
      showSubTitle: true,
      showDescription: true,
      showButton: true,
    };
  
    data = {};
    config = {};
  
    constructor() {
      super();
      this.data = { ...this.defaultData };
      this.config = { ...this.defaultConfig };
    }
  
    connectedCallback() {
      this.updateData();
      this.renderComponent();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      try {
        if (name === "config" && typeof newValue === "string") {
          this.config = Object.assign(this.config, JSON.parse(newValue));
        }
        if (name === "data" && typeof newValue === "string") {
          this.data = Object.assign(this.data, JSON.parse(newValue));
        }
      } catch (e) {
        console.log(e);
      }
  
      this.renderComponent();
    }
  
    updateData() {
      const updatedData = JSON.parse(this.getAttribute("data"));
      this.data = updatedData || this.defaultData;
      console.log(this.data);
    }
  
    renderComponent() {
      this.innerHTML = "";
      this.className = this.config.cardContainerClass;
  
      // Set card dimensions
      this.style.width = "280px";
      this.style.position = "relative"; // Ensure relative positioning for absolute children
      this.style.display = "inline-block";
  
      if (this.data.showImage && this.data.image) {
        const img = this.createElement("img", this.config.imageClass);
        img.src = this.data.image;
  
        // Apply dynamic styles if provided
        if (this.data.imageStyles) {
          Object.entries(this.data.imageStyles).forEach(([key, value]) => {
            img.style[key] = value;
          });
        }
  
        this.appendChild(img);
      }
  
      const cardBody = this.createElement("div", this.config.cardBodyClass);
  
      if (this.data.showTitle) {
        const title = this.createElement("h5", this.config.titleClass, this.data.title);
        cardBody.appendChild(title);
      }
  
      if (this.data.showSubTitle && this.data.subTitle) {
        const subTitle = this.createElement("h6", this.config.subTitleClass, this.data.subTitle);
        cardBody.appendChild(subTitle);
      }
  
      if (this.data.showDescription) {
        const description = this.createElement("p", this.config.textClass, this.data.description);
        cardBody.appendChild(description);
      }
  
      if (this.data.showButton && this.data.button) {
        const button = this.createElement("button", this.config.buttonClass, this.data.button);
        cardBody.appendChild(button);
      }
  
      this.appendChild(cardBody);
    }
  
    createElement(tag, className, content) {
      const elm = document.createElement(tag);
      elm.className = className;
      if (content) {
        elm.innerHTML = content;
      }
      return elm;
    }
  }
  
  customElements.define("card-component", CardComponent);
  
  if (!window.customElementsList) window.customElementsList = [];
  window.customElementsList.push({ component: "card-component", componentClass: CardComponent });
  