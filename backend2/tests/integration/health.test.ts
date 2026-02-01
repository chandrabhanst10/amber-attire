import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';

describe('Health Check', () => {
    it('should return 200 OK', async () => {
        // We expect 404 for / because we only have /api routes and /api-docs, but let's check a non-existent route or just ensure the server responds.
        // Actually, let's hit a known route or just check that we get a response (even 404 is a response from *our* app).
        // Better: let's assume we might have a health route or just check 404 for root.

        // Check Swagger docs endpoint which we just added
        const res = await request(app).get('/api-docs/');
        // Swagger UI redirects or returns html
        // Expect 200 or 301/302 redirect
        expect([200, 301, 302, 304]).toContain(res.status);
    });

    it('should return 404 for unknown route', async () => {
        const res = await request(app).get('/api/unknown-route-123');
        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
    });
});
