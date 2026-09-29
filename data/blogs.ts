export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  status: "published" | "draft";
  content: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const blogs: BlogPost[] = [
  {
    slug: "what-makes-a-cosmetic-formulation-work",
    title: "What Makes a Cosmetic Formulation Work?",
    excerpt:
      "Exploring the balance between ingredients, formulation strategy, stability and the final product experience.",
    date: "26 Sep 2026",
    readTime: "5 min read",
    status: "published",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=90",
    content: [
      {
        heading: "Formulation starts with a purpose",
        paragraphs: [
          "Every formulation should begin with a clear product objective. Before selecting ingredients, it is important to understand what the product is expected to do, who it is intended for and what kind of experience it should provide.",
          "A face wash, moisturizer, serum or body care product may all require completely different formulation strategies. The product goal influences the choice of ingredients, texture, delivery system, packaging and testing approach.",
        ],
      },
      {
        heading: "Ingredients are part of a system",
        paragraphs: [
          "An ingredient rarely works in isolation. Its performance depends on concentration, compatibility with other ingredients, pH, processing conditions and the overall formulation system.",
          "This is why ingredient research is such an important part of development. Understanding functionality helps formulate products that are not only interesting on paper but also practical and consistent in the final product.",
        ],
      },
      {
        heading: "Stability matters",
        paragraphs: [
          "A formulation may look excellent immediately after development, but that is only one point in its lifecycle. Stability testing helps us understand how a product behaves over time and under different conditions.",
          "Changes in colour, odour, texture, viscosity, pH or physical appearance can provide important information about the formulation and its compatibility with the selected packaging.",
        ],
      },
      {
        heading: "From laboratory to product",
        paragraphs: [
          "The laboratory is where ideas begin to become measurable products. Small batches allow different formulation approaches to be explored, compared and refined.",
          "Once a formulation demonstrates the desired characteristics, development moves toward pilot batches, process definition, testing and eventually scale-up.",
        ],
      },
      {
        heading: "The final experience",
        paragraphs: [
          "Scientific performance is only one part of a successful cosmetic product. Texture, spreadability, absorption, fragrance and the overall sensory experience can strongly influence how people perceive a product.",
          "The best development process brings these different considerations together while keeping the scientific foundation of the formulation at the centre.",
        ],
      },
    ],
  },

  {
    slug: "understanding-ingredients-beyond-the-label",
    title: "Understanding Ingredients Beyond the Label",
    excerpt:
      "A practical look at why ingredient selection matters when developing effective personal care products.",
    date: "Draft",
    readTime: "6 min read",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1800&q=90",
    content: [
      {
        heading: "Why ingredient selection matters",
        paragraphs: [
          "Choosing an ingredient is not simply about selecting something with an interesting benefit. A formulation needs ingredients that work together within a specific system.",
          "Function, compatibility, concentration, processing conditions and product objectives all influence whether an ingredient is appropriate.",
        ],
      },
      {
        heading: "Understanding functionality",
        paragraphs: [
          "Different ingredients can perform very different roles inside a cosmetic formulation. Understanding these functions helps create more balanced and purposeful products.",
          "The goal is to understand what each ingredient contributes and how that contribution changes when it is combined with the rest of the formulation.",
        ],
      },
    ],
  },

  {
    slug: "from-laboratory-idea-to-finished-product",
    title: "From Laboratory Idea to Finished Product",
    excerpt:
      "The journey from early formulation experiments to a product that is ready for real-world development.",
    date: "Draft",
    readTime: "7 min read",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=90",
    content: [
      {
        heading: "An idea becomes a formulation",
        paragraphs: [
          "Product development often begins with an idea, a consumer need or a specific performance objective.",
          "The laboratory provides an environment where that idea can be explored through controlled experiments and formulation trials.",
        ],
      },
      {
        heading: "Testing and refinement",
        paragraphs: [
          "Initial prototypes rarely represent the final product. Testing and refinement help identify areas where texture, stability, performance or processing need to be improved.",
          "Each development cycle provides information that can be used to create a more refined formulation.",
        ],
      },
      {
        heading: "Preparing for scale",
        paragraphs: [
          "Once the formulation reaches the desired development stage, attention shifts toward process requirements, pilot batches and scale-up considerations.",
          "The objective is to make sure the product developed in the laboratory can be translated into a consistent production process.",
        ],
      },
    ],
  },
];