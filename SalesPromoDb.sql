USE [master]  
GO  
/****** Object: Database [SibeeshPassion] Script Date: 06-02-2016 08:18:42 PM ******/  
CREATE DATABASE [SalesPromo]  


CREATE TABLE [dbo].[Winner](  
[Id] [int] NOT NULL,  
[FullName] [nvarchar](75) NOT NULL,  
[Address] [nvarchar](250) NOT NULL,  
[TelephoneNumber] [int] NOT NULL,  
PRIMARY KEY CLUSTERED
(  
[Id] ASC  
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]  
) ON [PRIMARY]  
GO


CREATE TABLE [dbo].[Global](  
[Id] [int] NOT NULL,  
[Name] [nvarchar](50) NOT NULL,  
[Value] [nvarchar](50) NOT NULL,  
PRIMARY KEY CLUSTERED
(  
[Id] ASC  
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]  
) ON [PRIMARY]  
GO


INSERT INTO [dbo].[Global]
           ([Id]
           ,[Name]
           ,[Value])
     VALUES
           ('1'
		   ,'Threshold'
           ,0)
GO




