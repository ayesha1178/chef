import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+()\- ]{7,18}$/;

export function validateEventInput(req: Request, res: Response, next: NextFunction): void {
  const { name, category, date, time, venue, description, image, capacity, registrationDeadline } = req.body;

  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.push('Event name must be at least 3 characters long.');
  }

  const validCategories = [
    'Competitive Programming', 'DSA', 'Workshop', 'Hackathon', 'Tech Talk', 'Competition', 'Contests', 'Community', 'Recruitment', 'Seminar', 'Cultural', 'Networking', 'Club Activity'
  ];
  if (!category || !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }

  if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.push('Date must be in valid format (YYYY-MM-DD).');
  }

  if (!time || typeof time !== 'string' || time.trim().length < 2) {
    errors.push('Time is required (e.g. "10:00 AM - 05:00 PM").');
  }

  if (!venue || typeof venue !== 'string' || venue.trim().length < 3) {
    errors.push('Venue must be at least 3 characters.');
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description must be at least 10 characters.');
  }

  if (!image || typeof image !== 'string' || !image.startsWith('http')) {
    errors.push('A valid image URL is required.');
  }

  if (capacity === undefined || isNaN(Number(capacity)) || Number(capacity) < 1) {
    errors.push('Capacity must be a positive integer greater than 0.');
  }

  if (!registrationDeadline || typeof registrationDeadline !== 'string') {
    errors.push('Registration deadline date is required (YYYY-MM-DD).');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
}

export function validateRegistrationInput(req: Request, res: Response, next: NextFunction): void {
  const { name, email, collegeYear, phone } = req.body;
  const errors: string[] = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters.');
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!collegeYear || typeof collegeYear !== 'string' || collegeYear.trim().length < 2) {
    errors.push('College and year of study is required.');
  }

  if (!phone || typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
    errors.push('A valid phone number is required (min 7 digits).');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
}

export function validateLoginInput(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;
  const errors: string[] = [];

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('Valid email address is required.');
  }

  if (!password || typeof password !== 'string' || password.length < 4) {
    errors.push('Password is required.');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
}
