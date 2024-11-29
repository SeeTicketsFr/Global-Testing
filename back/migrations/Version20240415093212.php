<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240415093212 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE step ALTER method DROP NOT NULL');
        $this->addSql('ALTER TABLE step ALTER expected_status_code DROP NOT NULL');
        $this->addSql('ALTER TABLE step ALTER url DROP NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE step ALTER method SET NOT NULL');
        $this->addSql('ALTER TABLE step ALTER expected_status_code SET NOT NULL');
        $this->addSql('ALTER TABLE step ALTER url SET NOT NULL');
    }
}
