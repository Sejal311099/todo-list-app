export interface ValidationError {
  field: string;
  message: string;
}

export const validateTask = (title: string, description: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Title validation
  if (!title.trim()) {
    errors.push({
      field: 'title',
      message: 'Title is required'
    });
  } else if (title.length < 3) {
    errors.push({
      field: 'title',
      message: 'Title must be at least 3 characters long'
    });
  } else if (title.length > 100) {
    errors.push({
      field: 'title',
      message: 'Title cannot exceed 100 characters'
    });
  }

  // Description validation
  if (description.length > 500) {
    errors.push({
      field: 'description',
      message: 'Description cannot exceed 500 characters'
    });
  }

  return errors;
}; 