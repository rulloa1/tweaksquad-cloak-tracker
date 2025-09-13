# TweakSquad Cloak Tracker

A sophisticated cloaking tracker system with browser fingerprinting capabilities. This system can track visitor behavior, collect device information, and manage redirect logging.

## Features

- **Browser Fingerprinting**: Uses FingerprintJS to generate unique visitor identifiers
- **IP Intelligence**: Automatically enriches visitor data with geographic and ISP information
- **Dual Logging**: Separate logs for general visits and redirected traffic
- **Admin Panel**: Secure interface to view collected data
- **Google Disguise**: Mimics Google's search page interface for cloaking purposes

## Project Structure

```
tweaksquad-cloak-tracker/
├── public/                 # Web-accessible files
│   ├── admin.php          # Admin panel for viewing logs
│   ├── logger.php         # API endpoint for data collection
│   ├── tracker.html       # Main tracking page (Google disguise)
│   ├── .htaccess          # Apache security configuration
│   ├── log.csv           # Main visitor log
│   └── redirect_log.csv  # Redirect-specific log
├── tracker.html           # Copy of tracking page in root
├── package.json           # Node.js dependencies and scripts
├── netlify.toml          # Netlify deployment configuration
└── README.md            # This file
```

## Setup & Installation

### Prerequisites

- Node.js (version 16 or higher)
- PHP 7.4+ (for server-side logging)
- Apache web server (for .htaccess support)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rulloa1/tweaksquad-cloak-tracker.git
   cd tweaksquad-cloak-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Main tracker: `http://localhost:3000/tracker.html`
   - Admin panel: `http://localhost:3000/admin.php?key=YOUR_ACCESS_KEY`

### Production Deployment

#### Netlify Deployment

1. **Connect to Netlify**
   - Link your GitHub repository to Netlify
   - The `netlify.toml` file contains the deployment configuration

2. **Set Environment Variables**
   ```bash
   ACCESS_KEY=your_super_secure_access_key_here
   ```

3. **Deploy**
   - Push to your main branch to trigger automatic deployment

#### Manual Server Deployment

1. **Upload files to web server**
   ```bash
   # Upload the public/ directory contents to your web root
   rsync -av public/ user@yourserver:/var/www/html/
   ```

2. **Set file permissions**
   ```bash
   chmod 644 *.php *.html *.csv
   chmod 755 public/
   ```

3. **Configure environment variables**
   - Set `ACCESS_KEY` in your server environment
   - Or modify `admin.php` directly (not recommended)

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ACCESS_KEY` | Secure key for admin panel access | `mySuperSecretKey2024` |

### Security Features

- **Input Validation**: All user inputs are sanitized and validated
- **Access Control**: CSV files are protected from direct access
- **HTTP Headers**: Security headers prevent common attacks
- **Error Handling**: Graceful error handling with proper HTTP status codes

## Usage

### Accessing the Tracker

Visit the tracker page which displays a Google search interface. The page automatically:
1. Loads FingerprintJS library
2. Generates a unique browser fingerprint
3. Collects device and browser information
4. Sends data to the logging endpoint
5. Redirects to the real Google after a delay

### Viewing Analytics

Access the admin panel at `/admin.php?key=YOUR_ACCESS_KEY` to view:
- Complete visitor logs with IP intelligence
- Redirect-specific analytics
- Real-time data timestamps

### Data Collected

The system collects the following information:
- **Fingerprint**: Unique browser identifier
- **IP Address**: Visitor's IP with geographic data
- **User Agent**: Browser and device information
- **Screen Resolution**: Display dimensions
- **Language**: Browser language setting
- **Timezone**: Visitor's timezone
- **Referrer**: Source page URL
- **ISP Information**: Internet service provider details

## API Endpoints

### POST /logger.php

Receives and logs visitor data.

**Request Body:**
```json
{
  "fingerprint": "unique_browser_id",
  "userAgent": "Mozilla/5.0...",
  "screen": "1920x1080",
  "lang": "en-US",
  "timezone": "America/New_York",
  "referrer": "https://example.com",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "redirected": true
}
```

**Response:**
```json
{
  "status": "logged",
  "timestamp": "2024-01-01 12:00:00"
}
```

## Development

### Available Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with live reload
- `npm run build`: Build the project for production
- `npm test`: Run tests (placeholder)

### File Structure

- **tracker.html**: Main cloaking page that mimics Google
- **logger.php**: Backend API for data collection and IP enrichment
- **admin.php**: Administrative interface for viewing collected data
- **.htaccess**: Apache configuration for security and performance

## Security Considerations

1. **Change Default Access Key**: Always change the default access key in production
2. **HTTPS Only**: Deploy only on HTTPS-enabled servers
3. **Regular Updates**: Keep dependencies updated for security patches
4. **Log Rotation**: Implement log rotation for large-scale deployments
5. **Rate Limiting**: Consider implementing rate limiting for the API endpoint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for educational and legitimate analytics purposes only. Ensure compliance with applicable laws and regulations regarding data collection and privacy in your jurisdiction.