case '/unlockadmin':
    file_put_contents(storage_path('framework/admin_unlocked.json'), json_encode([
        'time' => time(),
        'by' => $chatId
    ]));
    return $this->send("✅ Admin panel unlocked for 5 mins.", $chatId);
