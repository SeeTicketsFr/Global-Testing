<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240718072845 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(6) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE log ALTER created_at SET NOT NULL');
        $this->addSql('ALTER TABLE log ALTER id_scenario DROP NOT NULL');
        $this->addSql('ALTER TABLE log ALTER id_step DROP NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE log ALTER id_scenario SET NOT NULL');
        $this->addSql('ALTER TABLE log ALTER id_step SET NOT NULL');
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE log ALTER created_at DROP NOT NULL');
    }
}
