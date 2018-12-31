export function createState() {
  return {
    data: [],
    error: null,
    loading: false,
    loading_next: false,
    count: 0,
    options: {
      limit: 20,
      offset: 0,
      sort: {
        Relevant: { selected: false, column: null },
        Newest: { selected: true, column: "created_at" },
        Popular: { selected: false, column: "votes" },
        "A-Z": { selected: false, column: "question" }
      },
      order: null,
      filter: ""
    }
  };
}
