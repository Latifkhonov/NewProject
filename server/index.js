@@ .. @@
 // Login endpoint
 app.post('/api/auth/login', async (req, res) => {
   try {
     const { email, password } = req.body;
     
+    // Input validation
+    if (!email || !password) {
+      return res.status(400).json({ 
+        success: false, 
+        message: 'Email and password are required' 
+      });
+    }
+    
     // Find user by email
     const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
     
     if (!user) {
-      return res.status(401).json({ success: false, message: 'Invalid credentials' });
+      return res.status(401).json({ 
+        success: false, 
+        message: 'Invalid email or password' 
+      });
     }
     
     // Check password
     const isValidPassword = await bcrypt.compare(password, user.password);
     
     if (!isValidPassword) {
-      return res.status(401).json({ success: false, message: 'Invalid credentials' });
+      return res.status(401).json({ 
+        success: false, 
+        message: 'Invalid email or password' 
+      });
     }
     
     // Generate JWT token
     const token = jwt.sign(
       { userId: user.id, email: user.email, role: user.role },
       JWT_SECRET,
       { expiresIn: '24h' }
     );
     
+    // Update last login
+    db.prepare('UPDATE users SET last_login = ? WHERE id = ?')
+      .run(new Date().toISOString(), user.id);
+    
     // Create session
     const sessionId = crypto.randomUUID();
     db.prepare(`
       INSERT INTO user_sessions (id, user_id, token, expires_at)
       VALUES (?, ?, ?, ?)
     `).run(sessionId, user.id, token, new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
     
     // Log activity
     db.prepare(`
       INSERT INTO activity_logs (user_id, action, details, ip_address)
       VALUES (?, ?, ?, ?)
     `).run(user.id, 'login', 'User logged in successfully', req.ip);
     
     // Remove password from response
     const { password: _, ...userWithoutPassword } = user;
     
+    logger.info(`User logged in successfully: ${email}`);
+    
     res.json({
       success: true,
       message: 'Login successful',
       user: userWithoutPassword,
       token
     });
     
   } catch (error) {
     logger.error('Login error:', error);
     res.status(500).json({ 
       success: false, 
       message: 'Internal server error' 
     });
   }
 });