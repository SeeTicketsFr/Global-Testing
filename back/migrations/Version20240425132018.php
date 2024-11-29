<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240425132018 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE http_step ADD method VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE http_step ADD url VARCHAR(1000) DEFAULT NULL');
        $this->addSql('ALTER TABLE http_step ADD content JSONB DEFAULT NULL');
        $this->addSql('ALTER TABLE http_step ADD headers JSONB DEFAULT NULL');
        $this->addSql('ALTER TABLE http_step ADD check_conditions JSONB DEFAULT NULL');
        $this->addSql('ALTER TABLE http_step ADD treatment JSONB DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE http_step DROP method');
        $this->addSql('ALTER TABLE http_step DROP url');
        $this->addSql('ALTER TABLE http_step DROP content');
        $this->addSql('ALTER TABLE http_step DROP headers');
        $this->addSql('ALTER TABLE http_step DROP check_conditions');
        $this->addSql('ALTER TABLE http_step DROP treatment');
    }
}
