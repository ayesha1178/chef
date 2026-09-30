import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { storage } from '../services/storageAdapter.js';
import { ENV } from '../config/env.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

export async function loginAdmin(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const admin = await storage.getAdminByEmail(email);
    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials. Administrator account not found.'
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid password. Please check your credentials.'
      });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role
      },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Authentication successful.',
      data: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error: any) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed due to an internal server error.'
    });
  }
}

export async function getCurrentAdmin(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const admin = await storage.getAdminByEmail(req.admin.email);
    if (!admin) {
      res.status(404).json({ success: false, message: 'Admin account not found' });
      return;
    }

    res.json({
      success: true,
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error: any) {
    console.error('Error getting current admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin details.'
    });
  }
}

export async function getDashboardStats(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const stats = await storage.getDashboardStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to compute dashboard statistics.'
    });
  }
}

export async function resetData(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    storage.resetToDefaults();
    res.json({
      success: true,
      message: 'Demonstration data successfully reset to initial seed state.'
    });
  } catch (error: any) {
    console.error('Error resetting data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset demonstration data.'
    });
  }
}
