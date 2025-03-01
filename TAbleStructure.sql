IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
               WHERE TABLE_SCHEMA = 'dbo' 
               AND TABLE_NAME = 'Organizations')
BEGIN
    
    CREATE TABLE [dbo].[Organizations] (
        [OrganizationId] INT PRIMARY KEY IDENTITY(1,1), 
        [Name] NVARCHAR(100) NOT NULL             
       
    );

    PRINT 'Organizations table created successfully.';
END
ELSE
BEGIN
    PRINT 'Organizations table already exists.';
END
GO


USE [MultiTenantDB];
GO
INSERT INTO [dbo].[Organizations] ([Name])
VALUES
    ('Organization 1'), 
    ('Organization 2'),
    ('Organization 3'),
    ('Organization 4'),
    ('Organization 5');

PRINT '5 rows inserted into the Organizations table.';
GO



IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
               WHERE TABLE_SCHEMA = 'dbo' 
               AND TABLE_NAME = 'Clients')
BEGIN
    
    CREATE TABLE [dbo].[Clients] (
        [ClientId] INT PRIMARY KEY IDENTITY(1,1), 
        [Name] NVARCHAR(100) NOT NULL,           
        [OrganizationId] INT NOT NULL,        
        CONSTRAINT FK_Clients_Organizations FOREIGN KEY ([OrganizationId]) 
        REFERENCES [dbo].[Organizations]([OrganizationId]) 
    );

    PRINT 'Clients table created successfully.';
END
ELSE
BEGIN
    PRINT 'Clients table already exists.';
END
GO


USE [MultiTenantDB];
GO
INSERT INTO [dbo].[Clients] ([Name], [OrganizationId])
VALUES
    ('Client 1', 1), 
    ('Client 2', 1),
    ('Client 3', 2),
    ('Client 4', 2),
    ('Client 5', 3);

PRINT '5 rows inserted into the Clients table.';
GO



GO
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
               WHERE TABLE_SCHEMA = 'dbo' 
               AND TABLE_NAME = 'Projects')
BEGIN
    
    CREATE TABLE [dbo].[Projects] (
        [ProjectId] INT PRIMARY KEY IDENTITY(1,1), 
        [Name] NVARCHAR(100) NOT NULL, 
		[Description] NVARCHAR(100) NOT NULL, 
        [ClientId] INT NOT NULL,        
        CONSTRAINT FK_Projects_Clients FOREIGN KEY ([ClientId]) 
        REFERENCES [dbo].[Clients]([ClientId]) 
    );

    PRINT 'Projects table created successfully.';
END
ELSE
BEGIN
    PRINT 'Projects table already exists.';
END
GO


USE [MultiTenantDB];
GO
INSERT INTO [dbo].[Projects] ([Name],[Description], [ClientId])
VALUES
    ('Project 1','Project Desc 1', 2), 
    ('Project 2','Project Desc 2', 2),
    ('Project 3','Project Desc 3', 6),
    ('Project 4','Project Desc 4', 4),
    ('Project 5','Project Desc 5', 3);

PRINT '5 rows inserted into the Projects table.';
GO


