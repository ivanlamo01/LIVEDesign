$serviceAccountJson = Get-Content "ServiceAccountKey.json" -Raw
$serviceAccountOneLine = $serviceAccountJson -replace "`r`n", "" -replace "`n", ""

$envContent = @"
# Client-side variables (NEXT_PUBLIC_*)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBOqfVVNKQFhNvXHA7-k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=livedesign-d1dc2.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=livedesign-d1dc2
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=livedesign-d1dc2.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=626384205982
NEXT_PUBLIC_FIREBASE_APP_ID=1:626384205982:web:786020e1550dde481f238f

# Server-side variable
SERVICE_ACCOUNT_KEY=$serviceAccountOneLine
"@

Set-Content -Path ".env.production" -Value $envContent
Write-Host "✅ .env.production actualizado correctamente"
