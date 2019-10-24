IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20190915084727_A')
BEGIN
    CREATE TABLE [Rooms] (
        [RoomID] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        [Type] nvarchar(max) NULL,
        [Price] float NOT NULL,
        [Status] nvarchar(max) NULL,
        CONSTRAINT [PK_Rooms] PRIMARY KEY ([RoomID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20190915084727_A')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20190915084727_A', N'2.2.6-servicing-10079');
END;

GO

