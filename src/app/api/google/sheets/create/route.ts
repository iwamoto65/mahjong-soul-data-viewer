import { google, sheets_v4 } from 'googleapis';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const sheets = google.sheets('v4');

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data }: { data: string[][] } = await req.json();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  try {
    const allowedSpreadsheetIds = new Set<string>();

    const spreadsheet: sheets_v4.Schema$Spreadsheet = await sheets.spreadsheets.create({
      auth: oauth2Client,
      requestBody: {
        properties: {
          title: "mahjong-soul-data-viewer",
        },
        sheets: [
          {
            properties: {
              title: 'Sheet1',
            },
          },
        ],
      },
    }).then(response => response.data);

    const sheetId = spreadsheet.spreadsheetId;

    if (!sheetId) throw new Error('spreadsheet creation failed');
    allowedSpreadsheetIds.add(sheetId);

    if (allowedSpreadsheetIds.has(sheetId)) {
      await sheets.spreadsheets.values.append({
        auth: oauth2Client,
        spreadsheetId: sheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: data,
        },
      });
    } else {
      throw new Error("You do not have permission to edit this spreadsheet.");
    }

    return NextResponse.json({ sheetId, message: 'Spreadsheet created and data inserted' });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
